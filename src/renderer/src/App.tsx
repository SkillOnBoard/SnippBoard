//import Versions from './components/Versions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SearchBar from './pages/SearchBar'
import Create from './pages/Create'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.electron.ipcRenderer.on('loading-start', () => {
      setIsLoading(true)
    })

    window.electron.ipcRenderer.on('loading-end', () => {
      setIsLoading(false)
    })

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('loading-start')
      window.electron.ipcRenderer.removeAllListeners('loading-end')
    }
  }, [])
  return (
    <div className="bg-inherit bg-gray900 top-5 left-0 w-full px-4 ">
      <Router>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Moving data, please wait...</p>
        </div>
      )}
    </div>
  )
}

export default App
