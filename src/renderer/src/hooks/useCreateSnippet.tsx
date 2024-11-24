import { useState } from 'react'

type ResponseType = {
  data: Snippet | null
  error: string | null
  loading: boolean
}

type Props = {
  onSuccess: () => void
  onFailure: (error: string) => void
}

export const useCreateSnippet = ({
  onSuccess,
  onFailure
}: Props): [(data: any) => void, ResponseType] => {
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: false
  })

  const createSnippet = (form: Snippet): void => {
    setResponse({ ...response, loading: true })

    try {
      window.electron.ipcRenderer.send('create-snippet', form)

      window.api.createSnippetResponse((_event: any, response: any) => {
        if (response.status === 'success') {
          setResponse({ ...response, loading: true })
          onSuccess()
        } else {
          setResponse({ ...response, error: response.message, loading: false })
          onFailure(response.message)
        }
      })
    } catch (error) {
      setResponse({ ...response, error: error as string, loading: false })
    }
  }

  return [createSnippet, response]
}
