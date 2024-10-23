import { useState } from 'react'

type ResponseType = {
  data: string | null
  error: string | null
  loading: boolean
}

type Props = {
  onSuccess?: () => void
  onFailure: (error: string) => void
}

export const useCreateTag = ({
  onSuccess,
  onFailure
}: Props): [(data: string) => void, ResponseType] => {
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: false
  })

  const createTag = (tag: string): void => {
    setResponse({ ...response, loading: true })

    try {
      window.electron.ipcRenderer.send('create-tag', tag)

      window.api.createTagResponse((_event: any, response: any) => {
        if (response.status === 'success') {
          setResponse({ ...response, loading: true })
          if (onSuccess) onSuccess()
        } else {
          setResponse({ ...response, error: response.message, loading: false })
          onFailure(response.message)
        }
      })
    } catch (error) {
      setResponse({ ...response, error: error as string, loading: false })
    }
  }

  return [createTag, response]
}
