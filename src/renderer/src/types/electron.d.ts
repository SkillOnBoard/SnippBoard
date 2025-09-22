declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void
        on: (channel: string, callback: (event: any, ...args: any[]) => void) => void
        removeAllListeners: (channel: string) => void
      }
    }
    api: {
      listSnippetsResponse: (callback: (event: any, responseData: any) => void) => void
    }
    electronAPI: {
      createSnippet: (snippet: any) => Promise<any>
      updateSnippet: (snippet: any) => Promise<any>
      deleteSnippet: (id: number) => Promise<any>
      listSnippets: (searchData: any) => Promise<any>
      listTags: () => Promise<any>
    }
  }
}

export {}
