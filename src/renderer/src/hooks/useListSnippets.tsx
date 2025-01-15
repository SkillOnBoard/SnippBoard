import { useEffect, useState } from 'react'

type ReturnType = ResponseType & { refetch: () => void }

type ResponseType = {
  data: Snippet[] | null
  error: string | null
  loading: boolean
}

type SearchDataType = {
  ids?: number[]
}

export const useListSnippets = (searchData: SearchDataType = {}): ReturnType => {
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: true
  })

  const fetchData = (): void => {
    try {
      window.electron.ipcRenderer.send('list-snippets', searchData)

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
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    ...response,
    refetch: fetchData
  }
}
