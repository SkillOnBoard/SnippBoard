import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SnippetForm from '../../components/SnippetForm'
import Snippet from '../../components/forms/Snippet'

// Mock the hooks
const mockUseListTags = jest.fn()

jest.mock('../../hooks/useListTags', () => ({
  useListTags: () => mockUseListTags()
}))

const mockTags = [
  { id: 1, title: 'javascript' },
  { id: 2, title: 'typescript' },
  { id: 3, title: 'react' }
]

const renderSnippetForm = (form = new Snippet(), errors = {}) => {
  const mockSetForm = jest.fn()
  const mockOnSubmit = jest.fn()

  return {
    ...render(
      <SnippetForm
        form={form}
        setForm={mockSetForm}
        onSubmit={mockOnSubmit}
        errors={errors}
      />
    ),
    mockSetForm,
    mockOnSubmit
  }
}

describe('SnippetForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseListTags.mockReturnValue({ data: mockTags })
  })

  it('renders all form fields', () => {
    renderSnippetForm()

    expect(screen.getByPlaceholderText('create.fields.name.label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('create.fields.label.placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('create.fields.code.placeholder')).toBeInTheDocument()
  })

  it('displays form values correctly', () => {
    const form = new Snippet({
      title: 'Test Title',
      content: 'Test Content',
      labels: [{ id: 1, title: 'javascript', createdAt: new Date(), updatedAt: new Date() }]
    })

    renderSnippetForm(form)

    expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument()
  })

  it('calls setForm when title input changes', async () => {
    const user = userEvent.setup()
    const { mockSetForm } = renderSnippetForm()

    const titleInput = screen.getByPlaceholderText('create.fields.name.label')
    await user.type(titleInput, 'New Title')

    expect(mockSetForm).toHaveBeenCalled()
  })

  it('calls setForm when content textarea changes', async () => {
    const user = userEvent.setup()
    const { mockSetForm } = renderSnippetForm()

    const contentTextarea = screen.getByPlaceholderText('create.fields.code.placeholder')
    await user.type(contentTextarea, 'New Content')

    expect(mockSetForm).toHaveBeenCalled()
  })

  it('displays validation errors', () => {
    const errors = {
      title: 'Title is required',
      content: 'Content is required',
      labels: 'At least one label is required'
    }

    renderSnippetForm(new Snippet(), errors)

    // Check that error styling is applied (red borders)
    const titleInput = screen.getByPlaceholderText('create.fields.name.label')
    const contentTextarea = screen.getByPlaceholderText('create.fields.code.placeholder')
    const labelsInput = screen.getByPlaceholderText('create.fields.label.placeholder')

    expect(titleInput).toHaveClass('border-red-500')
    expect(contentTextarea.closest('div')).toHaveClass('border-red-500')
    expect(labelsInput.closest('div')).toHaveClass('border-red-500')
  })

  it('renders title input correctly', () => {
    renderSnippetForm()

    const titleInput = screen.getByPlaceholderText('create.fields.name.label')
    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveAttribute('type', 'text')
  })

  it('renders form with correct structure', () => {
    renderSnippetForm()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('create.fields.name.label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('create.fields.code.placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('create.fields.label.placeholder')).toBeInTheDocument()

    // Check grid structure
    const gridContainer = document.querySelector('.grid.gap-4')
    expect(gridContainer).toBeInTheDocument()

    const twoColumnGrid = document.querySelector('.grid.grid-cols-2.gap-3')
    expect(twoColumnGrid).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    const user = userEvent.setup()
    const { mockOnSubmit } = renderSnippetForm()

    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()

    if (form) {
      fireEvent.submit(form)
      expect(mockOnSubmit).toHaveBeenCalled()
    }
  })
})
