import { useNavigate } from 'react-router-dom'

function Home(): JSX.Element {
  const navigate = useNavigate()
  window.electron.ipcRenderer.send('resize-window', 'small')

  return (
    <div>
      <div className="text-blue-200">Home</div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2  border rounded-full"
        onClick={() => navigate('/other')}
      >
        Nav to other
      </button>
    </div>
  )
}

export default Home
