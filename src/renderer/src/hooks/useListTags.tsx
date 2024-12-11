import { useEffect, useState } from 'react'

type ResponseType = {
  data: Label[]
  error: string | null
  loading: boolean
}

export const useListTags = (): ResponseType => {
  const [response, setResponse] = useState<ResponseType>({
    data: [],
    error: null,
    loading: true
  })

  useEffect(() => {
    try {
      window.electron.ipcRenderer.send('list-tags')

      window.api.listTagsResponse((_event: any, responseData: any) => {
        if (responseData.status === 'success') {
          setResponse({
            ...response,
            data:
              responseData.message?.map((label) => {
                return { id: label.id, title: label.title } as Label
              }) || [],
            loading: false
          })
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
