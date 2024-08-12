import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar(): JSX.Element {
  const navigate = useNavigate()
  window.electron.ipcRenderer.send('resize-window', 'small')
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    switch (query) {
      case '':
        window.electron.ipcRenderer.send('resize-window', 'small')
        break
      case '/':
        navigate('/create')
        break
      default:
        window.electron.ipcRenderer.send('resize-window', 'big')
    }
  }, [query])

  const results = [
    { name: 'Customer orders', type: 'Code' },
    { name: 'SQL master', type: 'URL' },
    { name: 'Employees timesheet', type: 'Code' }
  ]

  return (
    <>
      <div className="fixed top-5 left-0 w-full px-4">
        <input
          type="text"
          className="w-full px-4 py-2 text-2xl outline-none bg-inherit"
          placeholder="SQL"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <hr className="border-gray-600" />
        {query && (
          <div className="absolute z-10 w-full mt-2 bg-gray-900 rounded-md shadow-lg">
            <ul className="text-gray-300">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <span>{result.name}</span>
                  </div>
                  <span className="text-blue-400 text-sm">{result.type}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchBar
