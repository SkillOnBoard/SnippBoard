import SearchBarCode from '@renderer/components/SearchBarCode'
import SearchBarRow from '@renderer/components/SearchBarRow'
import { useListSnippets } from '@renderer/hooks/useListSnippets'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBarHeader from '@renderer/components/SearchBarHeader'
import Layout from '@renderer/components/Layout'
import Action, { ActionType } from '@renderer/components/Footer/Action'
import { useTranslation } from 'react-i18next'
import Icon from '@renderer/components/atoms/Icon'
import Label from '@renderer/components/atoms/Label'
import DeleteModal from '@renderer/components/DeleteModal'

function SearchBar(): JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Snippet[]>([])
  const [showCode, setShowCode] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { t } = useTranslation()

  const { data } = useListSnippets()

  useEffect(() => {
    window.electron.ipcRenderer.send('resize-window', 'small')
  }, [])

  const filterData = (): Snippet[] => {
    return data
      ? // TODO: Explore how to filter faster and properly
        data.filter((obj) => {
          const value = query.trim().toLowerCase()
          return (
            obj.title.toLowerCase().includes(value) ||
            obj.content.toLowerCase().includes(value) ||
            obj.labels?.some((label) => label.title.toLowerCase().includes(value))
          )
        })
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

  const handleDelete = (): void => {
    console.log('delete')
    // window.electron.ipcRenderer.send('delete-snippet', results[selectedIndex].title)
    setDeleteModalOpen(true)
  }

  const handleCopy = (): void => {
    if (selectedIndex >= 0) {
      navigator.clipboard.writeText(results[selectedIndex]?.content)
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

    if (query) {
      filteredData.length > 0 ? setSelectedIndex(0) : setSelectedIndex(-1)
      window.electron.ipcRenderer.send('resize-window', 'big')
    } else {
      setShowCode(false)
      setSelectedIndex(-1)
      window.electron.ipcRenderer.send('resize-window', 'small')
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
          label: t('actions.create'),
          keyboardKeys: ['Meta', 'KeyR'], // Use KeyN once it has icon
          callback: (): void => navigate('/create')
        }
      ]
    : [
        {
          label: t('actions.create'),
          hidden: true,
          keyboardKeys: ['Meta', 'KeyR'], // Use KeyN once it has icon
          callback: (): void => navigate('/create')
        },
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
          label: t('actions.delete'),
          keyboardKeys: ['Meta', 'KeyD'],
          callback: handleDelete
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
              {!!results.length &&
                results.map((result, index) => (
                  <div key={index} ref={(el) => (rowRefs.current[index] = el)}>
                    <SearchBarRow
                      key={index}
                      index={index}
                      title={result.title}
                      labels={result.labels?.length > 0 ? [result.labels[0]?.title] : []}
                      selectedIndex={selectedIndex}
                      showCode={showCode}
                      setShowCode={setShowCode}
                      setSelectedIndex={setSelectedIndex}
                    />
                  </div>
                ))}
              {!results.length && (
                <div className="h-full flex flex-col items-center justify-center items-center">
                  <h1 color="text-gray-400">{t('search_bar.empty_state')}</h1>
                  <Action
                    action={{
                      label: t('actions.create'),
                      keyboardKeys: ['Meta', 'KeyR'], // Use KeyN once it has icon
                      callback: (): void => navigate('/create')
                    }}
                  />
                </div>
              )}
            </div>
            {showCode && results.length + 1 >= selectedIndex && (
              <SearchBarCode
                labels={
                  results[selectedIndex]?.labels?.length > 0
                    ? [results[selectedIndex]?.labels[0]]
                    : []
                }
                code={results[selectedIndex]?.content}
              />
            )}
          </div>
        </>
      )}
      {deleteModalOpen && (
        <DeleteModal onClose={() => setDeleteModalOpen(false)} onDelete={() => {}} />
      )}
    </Layout>
  )
}

export default SearchBar
