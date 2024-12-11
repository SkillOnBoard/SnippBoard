import { ElectronAPI } from '@electron-toolkit/preload'

type ResponseStatus = 'success' | 'error'

interface response {
  status: ResponseStatus
  message: unknown
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      listSnippetsResponse: (callback: (event: unknown, response: response) => void) => void
      createSnippetResponse: (callback: (event: unknown, response: response) => void) => void
      updateSnippetResponse: (callback: (event: unknown, response: response) => void) => void
      deleteSnippetResponse: (callback: (event: unknown, response: response) => void) => void
      listTagsResponse: (callback: (event: unknown, response: response) => void) => void
    }
  }
}
