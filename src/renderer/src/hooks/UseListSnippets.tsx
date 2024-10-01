import { useEffect, useRef } from 'react'

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
  const result = useRef<ResponseType>({ data: null, error: null, loading: true })
  useEffect(() => {
    console.log('ejecuta')
    try {
      // Send the order to the main process
      window.electron.ipcRenderer.send('list-snippets')

      // Listen for the response
      window.api.listSnippetsResponse((event, response) => {
        if (response.status === 'success') {
          result.current.data = response.message as DataType[]
        } else {
          result.current.error = response.message as string
        }
        result.current.loading = false
      })
    } catch (error) {
      result.current.error = error as string
      result.current.loading = false
    }
  }, [])
  return result.current
}
