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

export const useUpdateSnippet = ({
  onSuccess,
  onFailure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Props): [(data: any) => void, ResponseType] => {
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: false
  })

  const updateSnippet = (form: Snippet): void => {
    setResponse({ ...response, loading: true })

    try {
      window.electron.ipcRenderer.send('update-snippet', form)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.api.updateSnippetResponse((_event: any, response: any) => {
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

  return [updateSnippet, response]
}
