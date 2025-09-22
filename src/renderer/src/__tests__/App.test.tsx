import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock the pages
jest.mock('../pages/SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="search-bar">Search Bar</div>
  }
})

jest.mock('../pages/Create', () => {
  return function MockCreate() {
    return <div data-testid="create">Create</div>
  }
})

jest.mock('../pages/Edit', () => {
  return function MockEdit() {
    return <div data-testid="edit">Edit</div>
  }
})

const renderApp = () => {
  return render(<App />)
}

describe('App', () => {
  it('renders the main container with correct styling', () => {
    renderApp()

    // Find the main container div that has the styling classes
    const container = screen.getByTestId('search-bar').closest('.bg-gray-800')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('bg-gray-800')
    expect(container).toHaveClass('top-5')
    expect(container).toHaveClass('left-0')
    expect(container).toHaveClass('w-full')
    expect(container).toHaveClass('h-full')
    expect(container).toHaveClass('px-4')
  })

  it('renders SearchBar component on root route', () => {
    renderApp()

    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('renders Router with correct routes', () => {
    renderApp()

    // The router should be present
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })
})
