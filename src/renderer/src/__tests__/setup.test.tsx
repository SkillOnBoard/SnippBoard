import { render, screen } from '@testing-library/react'

// Simple test component to verify setup
const TestComponent = () => {
  return <div data-testid="test-component">Test Component</div>
}

describe('Test Setup', () => {
  it('renders a simple component', () => {
    render(<TestComponent />)

    expect(screen.getByTestId('test-component')).toBeInTheDocument()
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('has access to testing library matchers', () => {
    render(<TestComponent />)

    const element = screen.getByTestId('test-component')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Test Component')
  })
})
