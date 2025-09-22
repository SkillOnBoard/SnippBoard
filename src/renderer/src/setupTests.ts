import '@testing-library/jest-dom'

// Mock electron APIs
Object.defineProperty(window, 'electronAPI', {
  value: {
    createSnippet: jest.fn(),
    updateSnippet: jest.fn(),
    deleteSnippet: jest.fn(),
    listSnippets: jest.fn(),
    listTags: jest.fn()
  },
  writable: true
})

// Mock window.electron
Object.defineProperty(window, 'electron', {
  value: {
    ipcRenderer: {
      send: jest.fn()
    }
  },
  writable: true
})

// Mock window.api
Object.defineProperty(window, 'api', {
  value: {
    listSnippetsResponse: jest.fn()
  },
  writable: true
})

// Mock i18next
jest.mock('i18next', () => ({
  t: (key: string) => key,
  changeLanguage: jest.fn(),
  language: 'en'
}))

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en'
    }
  })
}))

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}))

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

// Mock navigator.clipboard
const mockWriteText = jest.fn()
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText
  },
  writable: true,
  configurable: true
})

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()
