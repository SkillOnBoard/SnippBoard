import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Data = {
  id: number
  name: string
  type: string
  content: string
}

function SearchBar(): JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Data[]>([])
  const [showCode, setShowCode] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    window.electron.ipcRenderer.send('resize-window', 'small')
  }, [])

  const filterData = (): Data[] => {
    return data.filter((obj) => obj.name.toLowerCase().includes(query.toLowerCase()))
  }

  useEffect(() => {
    const handleKeyDown = (e): void => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
      } else if (e.key === 'Enter') {
        // Manejar la selección (por ejemplo, navegar a un enlace o hacer algo con el elemento seleccionado)
        if (selectedIndex >= 0) {
          setShowCode((prev) => !prev)
        }
      }
    }

    // Añadir el event listener global al montar el componente
    window.addEventListener('keydown', handleKeyDown)

    // Limpiar el event listener al desmontar el componente
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, results])

  useEffect(() => {
    const filteredData = filterData()
    setResults(filteredData)

    switch (query) {
      case '':
        setShowCode(false)
        setSelectedIndex(-1)
        window.electron.ipcRenderer.send('resize-window', 'small')
        break
      case '/':
        navigate('/create')
        break
      default:
        if (filteredData.length > 0) setSelectedIndex(0)
        window.electron.ipcRenderer.send('resize-window', 'big')
    }
  }, [query])

  const data: Data[] = [
    {
      id: 1,
      name: 'Customer orders',
      type: 'Code',
      content: ' Customer orders hdsakd dhsadks dshadjkdhs'
    },
    { id: 2, name: 'SQL master', type: 'URL', content: 'SQL master hdsakd dhsadks dshadjkdhs' },
    {
      id: 3,
      name: 'Employees timesheet',
      type: 'Code',
      content: 'Employees timesheet hdsakd dhsadks dshadjkdhs'
    },
    {
      id: 4,
      name: 'undo last two commits',
      type: 'Code',
      content: 'undo last two commits hdsakd dhsadks dshadjkdhs'
    }
  ]

  return (
    <>
      <div className="fixed top-3 left-0 w-full px-4">
        <input
          type="text"
          className="w-full px-4 py-2 text-xl outline-none bg-inherit placeholder-gray-500"
          placeholder="Search for saved snippets"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <>
            <hr className="border-gray-600" />
            <div className={`w-full mt-2 text-gray-300 ${showCode ? 'grid grid-cols-2' : ''}`}>
              <div>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center px-4 py-2 cursor-pointer ${selectedIndex == index ? 'bg-gray-700' : ''}`}
                    onClick={() => setShowCode(true)}
                    onMouseOver={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{result.name}</span>
                    </div>
                    <span className="text-blue-400 text-sm">{result.type}</span>
                  </div>
                ))}
              </div>
              {showCode && results.length + 1 >= selectedIndex && (
                <div className="bg-gray-800">
                  <button onClick={() => setShowCode(false)}>Close</button>
                  <div>{results[selectedIndex]?.content}</div>
                </div>
              )}
            </div>
          </>
        )}
        {/* footer */}
        <div className="fixed bottom-2 left-0 w-full px-4">
          <hr className="border-gray-600 pb-2" />
          <div className="px-4">/ for actions</div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
