import { useState } from 'react'

type ResponseType = {
  data: SnippetDataType | null
  error: string | null
  loading: boolean
}

type SnippetDataType = {
  title: string
  labels: string[]
  description: string
}

export const useCreateSnippet = (): [(data: SnippetDataType) => void, ResponseType] => {
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: false
  })

  const createSnippet = (form: SnippetDataType): void => {
    setResponse({ ...response, loading: true })

    try {
      window.electron.ipcRenderer.send('create-snippet', form)

      window.api.createSnippetResponse((_event: any, response: any) => {
        if (response.status === 'success') {
          setResponse({ ...response, loading: true })
        } else {
          setResponse({ ...response, error: response.message, loading: false })
        }
      })
    } catch (error) {
      setResponse({ ...response, error: error as string, loading: false })
    }
  }

  return [createSnippet, response]
}
