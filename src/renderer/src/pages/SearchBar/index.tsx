import SearchBarCode from '@renderer/components/SearchBarCode'
import SearchBarRow from '@renderer/components/SearchBarRow'
import { useListSnippets } from '@renderer/hooks/useListSnippets'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBarHeader from '@renderer/components/SearchBarHeader'
import Layout from '@renderer/components/Layout'
import { ActionType } from '@renderer/components/Footer/Action'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

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
      navigator.clipboard.writeText(results[selectedIndex]?.description)
    }
  }

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
        filteredData.length > 0 ? setSelectedIndex(0) : setSelectedIndex(-1)
        window.electron.ipcRenderer.send('resize-window', 'big')
    }
  }, [query])

  const actions: ActionType[] = !query
    ? [
        {
          label: '',
          keyboardKeys: ['Escape'],
          hidden: true,
          callback: (): void => window.electron.ipcRenderer.send('hide-window')
        },
        {
          label: t('actions.for_actions'),
          keyboardKeys: ['Slash'],
          callback: (): void => setQuery('/')
        }
      ]
    : [
        {
          label: t('actions.navigate'),
          hidden: true,
          keyboardKeys: ['ArrowDown'],
          callback: handleArrowDown
        },
        {
          hidden: true,
          label: t('actions.navigate'),
          keyboardKeys: ['ArrowUp'],
          callback: handleArrowUp
        },
        {
          label: t('actions.copy'),
          keyboardKeys: ['Meta', 'KeyC'],
          callback: handleCopy
        },
        {
          label: t('actions.edit'),
          keyboardKeys: ['Enter'],
          callback: handleEnter
        }
      ]

  return (
    <Layout footerActions={actions}>
      <SearchBarHeader query={query} setQuery={setQuery} />
      {query && (
        <>
          <hr className="border-gray-700" />
          <div className={`w-full h-[301px] text-gray-300 ${showCode ? 'grid grid-cols-2' : ''}`}>
            <div className="mt-2 h-[301px] overflow-y-scroll no-scrollbar">
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
    </Layout>
  )
}

export default SearchBar
