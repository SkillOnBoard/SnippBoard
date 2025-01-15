//import Versions from './components/Versions'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import SearchBar from './pages/SearchBar'
import Create from './pages/Create'
import Edit from './pages/Edit'

function App(): JSX.Element {
  return (
    <div className="bg-inherit top-5 left-0 w-full h-full px-4 ">
      <Router>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/snippets/new" element={<Create />} />
          <Route path="/snippets/:id/edit" element={<Edit />} />
        </Routes>
      </Router>
      {/* {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )} */}
    </div>
  )
}

export default App
