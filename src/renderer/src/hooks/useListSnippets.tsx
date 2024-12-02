import { useEffect, useState } from 'react'

type ResponseType = {
  data: Snippet[] | null
  error: string | null
  loading: boolean
}

export const useListSnippets = (): ResponseType => {
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    try {
      window.electron.ipcRenderer.send('list-snippets')

      window.api.listSnippetsResponse((_event: any, responseData: any) => {
        if (responseData.status === 'success') {
          setResponse({ ...response, data: responseData.message as Snippet[], loading: false })
        } else {
          setResponse({
            ...response,
            error: responseData.message as string,
            loading: false
          })
        }
      })
    } catch (error) {
      setResponse({
        ...response,
        error: error as string,
        loading: false
      })
    }
  }, [])

  return response
}
