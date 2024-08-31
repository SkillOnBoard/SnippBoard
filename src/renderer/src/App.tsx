//import Versions from './components/Versions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SearchBar from './pages/SearchBar'
import Create from './pages/Create'
import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ipcRenderer.on('loading-start', () => {
      setIsLoading(true)
    })

    ipcRenderer.on('loading-end', () => {
      setIsLoading(false)
    })

    return (): void => {
      ipcRenderer.removeAllListeners('loading-start')
      ipcRenderer.removeAllListeners('loading-end')
    }
  }, [])

  return (
    <>
      {/* <Versions></Versions> */}
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
    </>
  )
}

export default App
