import SearchBarCode from '@renderer/components/SearchBarCode'
import SearchBarRow from '@renderer/components/SearchBarRow'
import { useListSnippets } from '../../hooks/UseListSnippets'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBarHeader from '@renderer/components/SearchBarHeader'
import Layout from '@renderer/components/Layout'

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

  const { data } = useListSnippets()

  useEffect(() => {
    window.electron.ipcRenderer.send('resize-window', 'small')
  }, [])

  const filterData = (): Data[] => {
    return data
      ? data.filter((obj) => obj.title.toLowerCase().includes(query.trim().toLowerCase()))
      : []
  }

  const handleArrowDown = (): void => {
    setSelectedIndex((prevIndex) => (prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex))
  }

  const handleArrowUp = (): void => {
    setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  const handleEnter = (): void => {
    if (selectedIndex >= 0) setShowCode((prev) => !prev)
  }

  const handleCopy = (): void => {
    if (showCode && selectedIndex >= 0) {
      navigator.clipboard.writeText(' testestes tes ')
    }
  }

  // useEffect(() => {
  //   const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  //   const handleKeyDown = (e): void => {
  //     if (e.key === 'ArrowDown') {
  //       e.preventDefault()
  //       setSelectedIndex((prevIndex) =>
  //         prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
  //       )
  //     } else if (e.key === 'ArrowUp') {
  //       e.preventDefault()
  //       setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  //     } else if (e.key === 'Enter') {
  //       e.preventDefault()
  //       if (selectedIndex >= 0) {
  //         setShowCode((prev) => !prev)
  //       }
  //     } else if ((e.ctrlKey && e.key === 'c' && !isMac) || (e.metaKey && e.key === 'c' && isMac)) {
  //       e.preventDefault()
  //       if (showCode && selectedIndex >= 0) {
  //         navigator.clipboard.writeText(results[selectedIndex]?.description)
  //       }
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyDown)

  //   return (): void => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [selectedIndex, results])

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
    <Layout
      footerActions={[
        {
          shortcut: 'ArrowDown',
          onClick: handleArrowDown
        },
        {
          shortcut: 'ArrowUp',
          onClick: handleArrowUp
        },
        {
          shortcut: 'Enter',
          onClick: handleEnter
        },
        {
          shortcut: 'copy',
          onClick: handleCopy
        }
      ]}
    >
      <SearchBarHeader query={query} setQuery={setQuery} />
      {query && (
        <>
          <div className={`w-full h-[301px] text-gray-300 ${showCode ? 'grid grid-cols-2' : ''}`}>
            <div className="mt-2">
              {results.map((result, index) => (
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
    </Layout>
  )
}

export default SearchBar
