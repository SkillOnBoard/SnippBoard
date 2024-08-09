import Versions from './components/Versions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Other from './components/Other'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      {/* <Versions></Versions> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/other" element={<Other />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
