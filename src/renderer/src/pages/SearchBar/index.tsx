import Footer from '@renderer/components/Footer'
import SearchBarCode from '@renderer/components/SearchBarCode'
import SearchBarInput from '@renderer/components/SearchBarInput'
import SearchBarRow from '@renderer/components/SearchBarRow'
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
        if (selectedIndex >= 0) {
          setShowCode((prev) => !prev)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

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
        <SearchBarInput query={query} setQuery={setQuery} />

        {query && (
          <>
            <hr className="border-gray-600" />
            <div className={`w-full mt-2 text-gray-300 ${showCode ? 'grid grid-cols-2' : ''}`}>
              <div>
                {results.map((result, index) => (
                  <SearchBarRow
                    key={index}
                    index={index}
                    resultName={result.name}
                    resultType={result.type}
                    selectedIndex={selectedIndex}
                    setShowCode={setShowCode}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))}
              </div>
              {showCode && results.length + 1 >= selectedIndex && (
                <SearchBarCode code={results[selectedIndex]?.content} setShowCode={setShowCode} />
              )}
            </div>
          </>
        )}
        <Footer tempText={'/ for actions'} />
      </div>
    </>
  )
}

export default SearchBar
