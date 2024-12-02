import './assets/main.css'
import './assets/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './locales/i18n'

import { NotificationsProvider } from './contexts/NotificationsContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </React.StrictMode>
)
