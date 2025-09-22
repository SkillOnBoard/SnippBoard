import { render, screen, act, waitFor } from '@testing-library/react'
import { NotificationsProvider, useNotifications } from '../../contexts/NotificationsContext'

// Test component to use the context
const TestComponent = () => {
  const { notification, addNotification } = useNotifications()

  return (
    <div>
      <button onClick={() => addNotification({ type: 'success', description: 'Success message' })}>
        Add Success
      </button>
      <button onClick={() => addNotification({ type: 'error', description: 'Error message' })}>
        Add Error
      </button>
      <button onClick={() => addNotification({ type: 'warning', description: 'Warning message' })}>
        Add Warning
      </button>
      {notification && (
        <div data-testid="notification">
          <span data-testid="notification-type">{notification.type}</span>
          <span data-testid="notification-description">{notification.description}</span>
        </div>
      )}
    </div>
  )
}

const renderWithProvider = () => {
  return render(
    <NotificationsProvider>
      <TestComponent />
    </NotificationsProvider>
  )
}

describe('NotificationsContext', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('provides notification context with initial null state', () => {
    renderWithProvider()

    expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
  })

  it('displays success notification when added', async () => {
    renderWithProvider()

    const addButton = screen.getByText('Add Success')
    act(() => {
      addButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('notification')).toBeInTheDocument()
      expect(screen.getByTestId('notification-type')).toHaveTextContent('success')
      expect(screen.getByTestId('notification-description')).toHaveTextContent('Success message')
    })
  })

  it('displays error notification when added', async () => {
    renderWithProvider()

    const addButton = screen.getByText('Add Error')
    act(() => {
      addButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('notification')).toBeInTheDocument()
      expect(screen.getByTestId('notification-type')).toHaveTextContent('error')
      expect(screen.getByTestId('notification-description')).toHaveTextContent('Error message')
    })
  })

  it('displays warning notification when added', async () => {
    renderWithProvider()

    const addButton = screen.getByText('Add Warning')
    act(() => {
      addButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('notification')).toBeInTheDocument()
      expect(screen.getByTestId('notification-type')).toHaveTextContent('warning')
      expect(screen.getByTestId('notification-description')).toHaveTextContent('Warning message')
    })
  })

  it('auto-hides notification after 3 seconds', async () => {
    renderWithProvider()

    const addButton = screen.getByText('Add Success')
    act(() => {
      addButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('notification')).toBeInTheDocument()
    })

    // Fast-forward time by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    await waitFor(() => {
      expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
    })
  })

  it('queues multiple notifications', async () => {
    renderWithProvider()

    const addSuccessButton = screen.getByText('Add Success')
    const addErrorButton = screen.getByText('Add Error')

    // Add multiple notifications quickly
    act(() => {
      addSuccessButton.click()
      addErrorButton.click()
    })

    // First notification should be visible
    await waitFor(() => {
      expect(screen.getByTestId('notification-type')).toHaveTextContent('success')
    })

    // Fast-forward to show second notification
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    await waitFor(() => {
      expect(screen.getByTestId('notification-type')).toHaveTextContent('error')
    })
  })

  it('handles component unmount gracefully', () => {
    const { unmount } = renderWithProvider()

    const addButton = screen.getByText('Add Success')
    act(() => {
      addButton.click()
    })

    // Wait for the timer to be set
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Should not throw when unmounting
    expect(() => unmount()).not.toThrow()
  })
})
