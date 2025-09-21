# Testing Setup for SnippBoard

This document describes the React Testing Library setup for the SnippBoard project.

## Overview

The project now includes comprehensive testing infrastructure using:
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **Jest DOM** - Additional DOM matchers
- **User Event** - User interaction simulation

## Installation

The following packages have been installed as dev dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest ts-jest identity-obj-proxy jest-transform-stub
```

## Configuration

### Jest Configuration (`jest.config.js`)

The Jest configuration includes:
- TypeScript support with `ts-jest`
- JSDOM environment for browser-like testing
- React JSX support
- Module mapping for CSS and asset files
- Coverage collection from renderer components

### Test Setup (`src/renderer/src/setupTests.ts`)

The setup file includes:
- Jest DOM matchers import
- Electron API mocking
- i18next mocking
- React Router mocking
- Global browser API mocks (ResizeObserver, IntersectionObserver)

## Test Structure

Tests are organized in the `src/renderer/src/__tests__/` directory:

```
__tests__/
├── App.test.tsx                    # Main App component tests
├── setup.test.tsx                  # Basic setup verification
├── components/
│   ├── Layout.test.tsx            # Layout component tests
│   └── SnippetForm.test.tsx       # Form component tests
├── contexts/
│   └── NotificationsContext.test.tsx # Context tests
├── hooks/
│   └── useListSnippets.test.tsx   # Custom hook tests
└── pages/
    ├── Create.test.tsx            # Create page tests
    ├── Edit.test.tsx              # Edit page tests
    └── SearchBar.test.tsx         # SearchBar page tests
```

## Running Tests

### Available Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPatterns="App.test.tsx"
```

## Test Examples

### Component Testing

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText('Button clicked')).toBeInTheDocument()
  })
})
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe('initial')
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook())

    act(() => {
      result.current.setValue('new value')
    })

    expect(result.current.value).toBe('new value')
  })
})
```

### Context Testing

```typescript
import { render, screen } from '@testing-library/react'
import { MyProvider } from '../MyContext'

const TestComponent = () => {
  const { value } = useMyContext()
  return <div>{value}</div>
}

describe('MyContext', () => {
  it('provides context value', () => {
    render(
      <MyProvider>
        <TestComponent />
      </MyProvider>
    )

    expect(screen.getByText('context value')).toBeInTheDocument()
  })
})
```

## Mocking

### Electron APIs

Electron APIs are mocked in the setup file:

```typescript
Object.defineProperty(window, 'electronAPI', {
  value: {
    createSnippet: jest.fn(),
    updateSnippet: jest.fn(),
    deleteSnippet: jest.fn(),
    listSnippets: jest.fn(),
    listTags: jest.fn(),
  },
  writable: true,
})
```

### External Libraries

Common external libraries are mocked:
- `i18next` and `react-i18next` for internationalization
- `react-router-dom` for routing
- CSS and asset files

## Coverage

Coverage reports are generated in the `coverage/` directory and include:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

## Best Practices

1. **Test user behavior, not implementation details**
2. **Use semantic queries** (`getByRole`, `getByLabelText`, etc.)
3. **Mock external dependencies** appropriately
4. **Keep tests focused** on single behaviors
5. **Use descriptive test names** that explain the expected behavior
6. **Test error states** and edge cases
7. **Use `userEvent`** for user interactions instead of `fireEvent`

## Troubleshooting

### Common Issues

1. **JSX not working**: Ensure `jsx: 'react-jsx'` is set in Jest config
2. **Module not found**: Check module mapping in Jest config
3. **Router conflicts**: Don't wrap components that already have routers
4. **Async operations**: Use `waitFor` for async state updates

### Debugging Tests

```typescript
// Print DOM structure
screen.debug()

// Print specific element
screen.debug(screen.getByRole('button'))

// Use container to access DOM directly
const { container } = render(<MyComponent />)
console.log(container.innerHTML)
```

## Future Enhancements

Consider adding:
- Visual regression testing with Storybook
- E2E testing with Playwright or Cypress
- Performance testing
- Accessibility testing with jest-axe
- Snapshot testing for complex components
