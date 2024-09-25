//import Versions from './components/Versions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SearchBar from './pages/SearchBar'
import Create from './pages/Create'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Change me to my onw page to avoid multiple rerenders for each route
  useEffect(() => {
    setIsLoading(true)
    try {
      // Send the order to the main process
      window.electron.ipcRenderer.send('list-snippets')

      // Listen for the response
      window.api.listSnippetsResponse((event, response) => {
        if (response.status === 'success') {
          setIsLoading(false)
          console.log('snippets list', response.message)
        }
      })
    } catch (error) {
      setIsLoading(false)
      console.error(error)
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
        </div>
      )}
    </div>
  )
}

export default App
