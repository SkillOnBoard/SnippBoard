import { createContext, useState, useContext, useCallback, useEffect } from 'react'

type Types = 'success' | 'error' | 'warning'

export type NotificationType = {
  type: Types
  description: string
}

const NotificationsContext = createContext<{
  notification: NotificationType | null
  addNotification: (newNotification: NotificationType) => void
}>({
  notification: null,
  addNotification: () => {}
})

export const NotificationsProvider = ({ children }: { children: JSX.Element }) => {
  const [queue, setQueue] = useState<NotificationType[]>([])
  const [notification, setNotification] = useState<NotificationType | null>(null)
  let timer: NodeJS.Timeout | null = null

  // Añade un nuevo mensaje a la cola
  const addNotification = useCallback((newNotification: NotificationType) => {
    setQueue((prevQueue) => [...prevQueue, newNotification])
  }, [])

  // Muestra y elimina los mensajes
  useEffect((): void => {
    if (!notification && queue.length > 0) {
      const nextNotification = queue[0]
      setNotification(nextNotification)
      setQueue((prevQueue) => prevQueue.slice(1))

      // Oculta el toast tras 1 segundo
      timer = setTimeout(() => {
        console.log('timeout')
        setNotification(null)
      }, 1000)
    }
  }, [notification, queue])

  useEffect(() => {
    return (): void => {
      console.log('clear timeout')
      timer && clearTimeout(timer)
    }
  }, [timer])

  return (
    <NotificationsContext.Provider value={{ notification, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  )
}

// Hook para usar el contexto
export const useNotifications = () => useContext(NotificationsContext)
