import { useNavigate } from 'react-router-dom'

function Create(): JSX.Element {
  const navigate = useNavigate()
  window.electron.ipcRenderer.send('resize-window', 'big')

  return (
    <div>
      <div className="text-blue-200">Create page</div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2  border rounded-full"
        onClick={() => navigate('/')}
      >
        Nav to Search
      </button>
    </div>
  )
}

export default Create
