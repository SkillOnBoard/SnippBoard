import { ipcRenderer } from 'electron'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Create(): JSX.Element {
  const [dataPath, setDataPath] = useState<string | null>(null)

  const navigate = useNavigate()
  window.electron.ipcRenderer.send('resize-window', 'big')

  const handleChoosePath = async (): Promise<void> => {
    const path = await ipcRenderer.invoke('choose-data-path')
    setDataPath(path)
  }

  return (
    <div>
      <div className="text-blue-200">Create page</div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleChoosePath}>
          Choose Data Storage Location
        </button>
        {dataPath && <div className="text-blue-200">Data Path: {dataPath}</div>}
      </div>
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
