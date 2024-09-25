//import Versions from './components/Versions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SearchBar from './pages/SearchBar'
import Create from './pages/Create'
import { useState } from 'react'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
