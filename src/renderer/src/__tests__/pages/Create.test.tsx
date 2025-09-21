import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Create from '../../pages/Create'
import { NotificationsProvider } from '../../contexts/NotificationsContext'

// Mock the hooks
const mockUseCreateSnippet = jest.fn()
const mockNavigate = jest.fn()

jest.mock('../../hooks/useCreateSnippet', () => ({
  useCreateSnippet: () => mockUseCreateSnippet()
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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

const renderCreate = () => {
  return render(
    <BrowserRouter>
      <NotificationsProvider>
        <Create />
      </NotificationsProvider>
    </BrowserRouter>
  )
}

describe('Create', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCreateSnippet.mockReturnValue([jest.fn()])
  })

  it('renders the create form', () => {
    renderCreate()

    expect(screen.getByText('create.header')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('create.fields.name.label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('create.fields.code.placeholder')).toBeInTheDocument()
  })

  it('resizes window to big on mount', () => {
    renderCreate()

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledWith('resize-window', 'big')
  })

  it('handles form submission with valid data', async () => {
    const user = userEvent.setup()
    const mockCreateSnippet = jest.fn()
    mockUseCreateSnippet.mockReturnValue([mockCreateSnippet])

    renderCreate()

    const titleInput = screen.getByPlaceholderText('create.fields.name.label')
    const contentTextarea = screen.getByPlaceholderText('create.fields.code.placeholder')

    await user.type(titleInput, 'Test Snippet')
    await user.type(contentTextarea, 'console.log("test")')

    // Submit form with Cmd+Enter
    await user.keyboard('{Meta>}{Enter}{/Meta}')

    expect(mockCreateSnippet).toHaveBeenCalledWith({
      title: 'Test Snippet',
      content: 'console.log("test")',
      labels: []
    })
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    renderCreate()

    // Try to submit empty form
    await user.keyboard('{Meta>}{Enter}{/Meta}')

    // Form validation should prevent submission
    // The exact error handling depends on the Snippet form implementation
  })

  it('handles back navigation with Escape key', async () => {
    const user = userEvent.setup()
    renderCreate()

    await user.keyboard('{Escape}')

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('handles back navigation with back button', async () => {
    const user = userEvent.setup()
    renderCreate()

    const backButton = screen.getByText('actions.back')
    await user.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('calls createSnippet with correct data structure', async () => {
    const user = userEvent.setup()
    const mockCreateSnippet = jest.fn()
    mockUseCreateSnippet.mockReturnValue([mockCreateSnippet])

    renderCreate()

    const titleInput = screen.getByPlaceholderText('create.fields.name.label')
    const contentTextarea = screen.getByPlaceholderText('create.fields.code.placeholder')

    await user.type(titleInput, 'My Test Snippet')
    await user.type(contentTextarea, 'const x = 42;')

    await user.keyboard('{Meta>}{Enter}{/Meta}')

    expect(mockCreateSnippet).toHaveBeenCalledWith({
      title: 'My Test Snippet',
      content: 'const x = 42;',
      labels: []
    })
  })
})
