import { render, screen } from '@testing-library/react'
import Layout from '../../components/Layout'

describe('Layout', () => {
  it('renders children without header or footer when no props provided', () => {
    render(
      <Layout>
        <div data-testid="child">Test Content</div>
      </Layout>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })

  it('renders header when header prop is provided', () => {
    render(
      <Layout header="Test Header" back={() => {}}>
        <div data-testid="child">Test Content</div>
      </Layout>
    )

    expect(screen.getByText('Test Header')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders footer when footerActions prop is provided', () => {
    const mockActions = [
      {
        label: 'Test Action',
        keyboardKeys: ['Enter'],
        callback: jest.fn()
      }
    ]

    render(
      <Layout footerActions={mockActions}>
        <div data-testid="child">Test Content</div>
      </Layout>
    )

    expect(screen.getByText('Test Action')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders both header and footer when both props are provided', () => {
    const mockActions = [
      {
        label: 'Test Action',
        keyboardKeys: ['Enter'],
        callback: jest.fn()
      }
    ]

    render(
      <Layout header="Test Header" back={() => {}} footerActions={mockActions}>
        <div data-testid="child">Test Content</div>
      </Layout>
    )

    expect(screen.getByText('Test Header')).toBeInTheDocument()
    expect(screen.getByText('Test Action')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(
      <Layout>
        <div data-testid="child">Test Content</div>
      </Layout>
    )

    const container = screen.getByTestId('child').parentElement
    expect(container).toHaveClass(
      'fixed',
      'w-full',
      'h-full',
      'left-0',
      'top-0',
      'bg-gray-800',
      'border',
      'border-gray-700'
    )
  })
})
