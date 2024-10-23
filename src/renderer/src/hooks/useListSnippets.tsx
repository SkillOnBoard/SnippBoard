import { useEffect, useState } from 'react'

type ResponseType = {
  data: DataType[] | null
  error: string | null
  loading: boolean
}

type DataType = {
  title: string
  labels: string[]
  description: string
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
          setResponse({ ...response, data: responseData.message as DataType[], loading: false })
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
