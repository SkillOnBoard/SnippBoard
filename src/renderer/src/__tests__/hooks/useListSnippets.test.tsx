import { renderHook, act } from '@testing-library/react'
import { useListSnippets } from '../../hooks/useListSnippets'

// Mock electron APIs
const mockElectronAPI = {
  ipcRenderer: {
    send: jest.fn()
  }
}

const mockAPI = {
  listSnippetsResponse: jest.fn()
}

Object.defineProperty(window, 'electron', {
  value: mockElectronAPI,
  writable: true,
})

Object.defineProperty(window, 'api', {
  value: mockAPI,
  writable: true,
})

describe('useListSnippets', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useListSnippets())

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
  })

  it('does not fetch data when no search parameters provided', () => {
    const { result } = renderHook(() => useListSnippets({ searchText: '' }))

    expect(mockElectronAPI.ipcRenderer.send).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
  })

  it('fetches data when searchText is provided', () => {
    renderHook(() => useListSnippets({ searchText: 'test' }))

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledWith('list-snippets', { searchText: 'test' })
  })

  it('fetches data when ids are provided', () => {
    renderHook(() => useListSnippets({ ids: [1, 2, 3] }))

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledWith('list-snippets', { ids: [1, 2, 3] })
  })

  it('handles successful response', () => {
    const mockSnippets = [
      { id: 1, title: 'Test 1', content: 'Content 1' },
      { id: 2, title: 'Test 2', content: 'Content 2' }
    ]

    const { result } = renderHook(() => useListSnippets({ searchText: 'test' }))

    // Simulate successful response
    act(() => {
      mockAPI.listSnippetsResponse.mock.calls[0][0](null, {
        status: 'success',
        message: mockSnippets
      })
    })

    expect(result.current.data).toEqual(mockSnippets)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('handles error response', () => {
    const { result } = renderHook(() => useListSnippets({ searchText: 'test' }))

    // Simulate error response
    act(() => {
      mockAPI.listSnippetsResponse.mock.calls[0][0](null, {
        status: 'error',
        message: 'Database error'
      })
    })

    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('Database error')
  })

  it('handles exception during fetch', () => {
    // Mock ipcRenderer.send to throw an error
    mockElectronAPI.ipcRenderer.send.mockImplementation(() => {
      throw new Error('IPC Error')
    })

    const { result } = renderHook(() => useListSnippets({ searchText: 'test' }))

    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toEqual(new Error('IPC Error'))
  })

  it('provides refetch function', () => {
    const { result } = renderHook(() => useListSnippets({ searchText: 'test' }))

    expect(typeof result.current.refetch).toBe('function')

    // Test refetch
    act(() => {
      result.current.refetch()
    })

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledTimes(2) // Initial call + refetch
  })

  it('updates when searchText changes', () => {
    const { rerender } = renderHook(
      ({ searchText }) => useListSnippets({ searchText }),
      { initialProps: { searchText: 'test1' } }
    )

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledWith('list-snippets', { searchText: 'test1' })

    rerender({ searchText: 'test2' })

    expect(mockElectronAPI.ipcRenderer.send).toHaveBeenCalledWith('list-snippets', { searchText: 'test2' })
  })
})
