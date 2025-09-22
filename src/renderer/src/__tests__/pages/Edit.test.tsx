import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Edit from '../../pages/Edit'
import { NotificationsProvider } from '../../contexts/NotificationsContext'

// Mock the hooks
const mockUseListSnippets = jest.fn()
const mockUseUpdateSnippet = jest.fn()
const mockNavigate = jest.fn()

jest.mock('../../hooks/useListSnippets', () => ({
  useListSnippets: () => mockUseListSnippets()
}))

jest.mock('../../hooks/useUpdateSnippet', () => ({
  useUpdateSnippet: () => mockUseUpdateSnippet()
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
}))

// Mock electron APIs
const mockElectronAPI = {
  ipcRenderer: {
    send: jest.fn()
  }
}

Object.defineProperty(window, 'electron', {
  value: mockElectronAPI,
  writable: true,
})

const mockSnippet = {
  id: 1,
  title: 'Original Title',
  content: 'Original content',
  labels: [{ id: 1, title: 'javascript' }]
}

const renderEdit = () => {
  return render(
    <BrowserRouter>
      <NotificationsProvider>
        <Edit />
      </NotificationsProvider>
    </BrowserRouter>
  )
}

describe('Edit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseListSnippets.mockReturnValue({
      data: [mockSnippet],
      loading: false
    })
    mockUseUpdateSnippet.mockReturnValue([jest.fn()])
  })

  it('renders the edit form with existing data', async () => {
    renderEdit()

    await waitFor(() => {
      expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Original content')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    mockUseListSnippets.mockReturnValue({
      data: null,
      loading: true
    })

    renderEdit()

    // Should return null while loading
    expect(screen.queryByText('create.header')).not.toBeInTheDocument()
  })

  it('resizes window to big on mount', () => {
    renderEdit()

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledWith('resize-window', 'big')
  })

  it('handles form submission with updated data', async () => {
    const user = userEvent.setup()
    const mockUpdateSnippet = jest.fn()
    mockUseUpdateSnippet.mockReturnValue([mockUpdateSnippet])

    renderEdit()

    await waitFor(() => {
      expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument()
    })

    const titleInput = screen.getByDisplayValue('Original Title')
    const contentTextarea = screen.getByDisplayValue('Original content')

    // Clear and update the title
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated Title')

    // Clear and update the content
    await user.clear(contentTextarea)
    await user.type(contentTextarea, 'Updated content')

    // Submit form with Cmd+Enter
    await user.keyboard('{Meta>}{Enter}{/Meta}')

    expect(mockUpdateSnippet).toHaveBeenCalledWith({
      id: 1,
      title: 'Updated Title',
      content: 'Updated content',
      labels: [{ id: 1, title: 'javascript' }]
    })
  })

  it('handles back navigation with Escape key', async () => {
    const user = userEvent.setup()
    renderEdit()

    await waitFor(() => {
      expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument()
    })

    await user.keyboard('{Escape}')

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('handles back navigation with back button', async () => {
    const user = userEvent.setup()
    renderEdit()

    await waitFor(() => {
      expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument()
    })

    const backButton = screen.getByText('actions.back')
    await user.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('updates form when snippet data changes', async () => {
    const user = userEvent.setup()
    const { rerender } = renderEdit()

    await waitFor(() => {
      expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument()
    })

    // Simulate data change
    const updatedSnippet = {
      ...mockSnippet,
      title: 'New Title',
      content: 'New content'
    }

    mockUseListSnippets.mockReturnValue({
      data: [updatedSnippet],
      loading: false
    })

    rerender(
      <BrowserRouter>
        <NotificationsProvider>
          <Edit />
        </NotificationsProvider>
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByDisplayValue('New Title')).toBeInTheDocument()
      expect(screen.getByDisplayValue('New content')).toBeInTheDocument()
    })
  })
})
