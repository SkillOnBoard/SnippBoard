import { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react'

type Types = 'success' | 'error' | 'warning'

export type NotificationType = {
  type: Types
  description: string
}

type ReturnType = {
  notification: NotificationType | null
  addNotification: (newNotification: NotificationType) => void
}

const NotificationsContext = createContext<{
  notification: NotificationType | null
  addNotification: (newNotification: NotificationType) => void
}>({
  notification: null,
  addNotification: () => {}
})

export const NotificationsProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [queue, setQueue] = useState<NotificationType[]>([])
  const [notification, setNotification] = useState<NotificationType | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Add new notification to the queue
  const addNotification = useCallback((newNotification: NotificationType) => {
    setQueue((prevQueue) => [...prevQueue, newNotification])
  }, [])

  // Show and hide the toast messages
  useEffect(() => {
    if (!notification && queue.length > 0) {
      const nextNotification = queue[0]
      setNotification(nextNotification)
      setQueue((prevQueue) => prevQueue.slice(1))

      // Hide the toast message after 3 seconds
      timerRef.current = setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }, [notification, queue])

  return (
    <NotificationsContext.Provider value={{ notification, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = (): ReturnType => useContext(NotificationsContext)
