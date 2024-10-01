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
    console.log('ejecuta')
    try {
      // Envía el comando para listar snippets
      window.electron.ipcRenderer.send('list-snippets')

      // Escucha la respuesta
      window.api.listSnippetsResponse((event: any, responseData: any) => {
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
  }, []) // Solo se ejecuta una vez al montar el componente

  return response
}
