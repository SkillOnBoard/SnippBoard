import Footer from '@renderer/components/Footer'
import SearchBarCode from '@renderer/components/SearchBarCode'
import SearchBarRow from '@renderer/components/SearchBarRow'
import { useListSnippets } from '../../hooks/UseListSnippets'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBarHeader from '@renderer/components/SearchBarHeader'

type Data = {
  title: string
  labels: string[]
  description: string
}

function SearchBar(): JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Data[]>([])
  const [showCode, setShowCode] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  const { data } = useListSnippets()

  useEffect(() => {
    window.electron.ipcRenderer.send('resize-window', 'small')
  }, [])

  const filterData = (): Data[] => {
    return data
      ? data.filter((obj) => obj.title.toLowerCase().includes(query.trim().toLowerCase()))
      : []
  }

  useEffect(() => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

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
        e.preventDefault()
        if (selectedIndex >= 0) {
          setShowCode((prev) => !prev)
        }
      } else if ((e.ctrlKey && e.key === 'c' && !isMac) || (e.metaKey && e.key === 'c' && isMac)) {
        e.preventDefault()
        if (showCode && selectedIndex >= 0) {
          navigator.clipboard.writeText(results[selectedIndex]?.description)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, results, showCode])

  useEffect(() => {
    if (selectedIndex !== null && rowRefs.current[selectedIndex]) {
      rowRefs.current[selectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedIndex])

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

  return (
    <>
      <div className="fixed w-full left-0 top-0">
        <SearchBarHeader query={query} setQuery={setQuery} />
        {query && (
          <>
            <hr className="border-gray-600" />
            <div className={`w-full h-[301px] text-gray-300 ${showCode ? 'grid grid-cols-2' : ''}`}>
              <div className="mt-2 h-[297px] overflow-y-scroll">
                {results.map((result, index) => (
                  <div key={index} ref={(el) => (rowRefs.current[index] = el)}>
                    <SearchBarRow
                      key={index}
                      index={index}
                      title={result.title}
                      labels={result.labels}
                      selectedIndex={selectedIndex}
                      showCode={showCode}
                      setShowCode={setShowCode}
                      setSelectedIndex={setSelectedIndex}
                    />
                  </div>
                ))}
              </div>
              {showCode && results.length + 1 >= selectedIndex && (
                <SearchBarCode
                  labels={results[selectedIndex]?.labels || []}
                  code={results[selectedIndex]?.description}
                />
              )}
            </div>
          </>
        )}
        <Footer tempText={'/ for actions'} topBorder={Boolean(query)} />
      </div>
    </>
  )
}

export default SearchBar
