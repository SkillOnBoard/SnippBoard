import SearchBarCode from '@renderer/components/SearchBarCode'
import SearchBarRow from '@renderer/components/SearchBarRow'
import { useListSnippets } from '@renderer/hooks/useListSnippets'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBarHeader from '@renderer/components/SearchBarHeader'
import Layout from '@renderer/components/Layout'
import Action, { ActionType } from '@renderer/components/Footer/Action'
import { useTranslation } from 'react-i18next'
import DeleteModal from '@renderer/components/DeleteModal'
import { useDeleteSnippet } from '@renderer/hooks/useDeleteSnippet'
import { useNotifications } from '@renderer/contexts/NotificationsContext'

function SearchBar(): JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Snippet[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { t } = useTranslation()
  const { addNotification } = useNotifications()
  const showEmptyState = results.length === 0
  const showCode = !showEmptyState && results.length + 1 >= selectedIndex

  const { data, refetch } = useListSnippets()
  const [deleteSnippet] = useDeleteSnippet({
    onSuccess: () => {
      addNotification({ type: 'success', description: t('delete.notifications.success') })
      refetch()
      setDeleteModalOpen(false)
    },
    onFailure: (error) => {
      addNotification({ type: 'error', description: t('delete.notifications.error', { error }) })
      console.log('error', error)
    }
  })

  const onDelete = (): void => {
    deleteSnippet(results[selectedIndex].id)
  }

  useLayoutEffect(() => {
    window.electron?.ipcRenderer.send('resize-window', 'small')
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

  const closeAppAndPasteClipboard = (): void => {
    try {
      console.log(1)
      navigator.clipboard.writeText(results[selectedIndex]?.content)
      console.log(2)
      window.electron?.ipcRenderer.send('close-and-paste')
      console.log(3)
    } catch (error) {
      console.error('Error al pegar el portapapeles:', error)
    }
  }

  const handleEscape = (): void => {
    if (deleteModalOpen) {
      setDeleteModalOpen(false)
    } else {
      window.electron?.ipcRenderer.send('hide-window')
    }
  }

  const handleCreate = (): void => {
    navigate('/snippets/new')
  }

  const handleEdit = (): void => {
    navigate(`/snippets/${results[selectedIndex].id}/edit`)
  }

  const handleArrowDown = (): void => {
    setSelectedIndex((prevIndex) => (prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex))
  }

  const handleArrowUp = (): void => {
    setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  const handleEnter = (): void => {
    if (deleteModalOpen) {
      onDelete()
    } else {
      closeAppAndPasteClipboard()
    }
  }

  const handleDelete = (): void => {
    setDeleteModalOpen(true)
  }

  const handleCopy = (): void => {
    if (selectedIndex >= 0) {
      navigator.clipboard.writeText(results[selectedIndex]?.content)
      addNotification({ type: 'success', description: t('copy.notifications.success') })
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
      window.electron?.ipcRenderer.send('resize-window', 'big')
    } else {
      window.electron?.ipcRenderer.send('resize-window', 'small')
      setSelectedIndex(-1)
    }
  }, [query, data])

  const actions: ActionType[] = [
    {
      label: '',
      keyboardKeys: ['Escape'],
      hidden: true,
      callback: handleEscape
    },
    {
      label: t('actions.create'),
      hidden: !!query && !showEmptyState,
      keyboardKeys: ['Meta', 'KeyN'],
      callback: handleCreate
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
      callback: handleDelete,
      disabled: showEmptyState || !query
    },
    {
      label: t('actions.copy'),
      keyboardKeys: ['Meta', 'KeyC'],
      callback: handleCopy,
      disabled: showEmptyState || !query
    },
    {
      label: '',
      keyboardKeys: ['Enter'],
      hidden: true,
      callback: handleEnter,
      disabled: showEmptyState || !query
    },
    {
      label: t('actions.edit'),
      keyboardKeys: ['Meta', 'KeyE'],
      callback: handleEdit,
      disabled: showEmptyState || !query
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
              {!showEmptyState &&
                results.map((result, index) => (
                  <div key={index} ref={(el) => (rowRefs.current[index] = el)}>
                    <SearchBarRow
                      key={index}
                      index={index}
                      title={result.title}
                      labels={result.labels?.length > 0 ? [result.labels[0]?.title] : []}
                      selectedIndex={selectedIndex}
                      showCode={showCode}
                      setSelectedIndex={setSelectedIndex}
                    />
                  </div>
                ))}
              {showEmptyState && (
                <div className="h-full flex flex-col items-center justify-center items-center">
                  <h1 color="text-gray-400">{t('search_bar.empty_state')}</h1>
                  <Action
                    action={{
                      label: t('actions.create'),
                      keyboardKeys: ['Meta', 'KeyN'],
                      callback: handleCreate
                    }}
                  />
                </div>
              )}
            </div>
            {showCode && (
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
        <DeleteModal onClose={() => setDeleteModalOpen(false)} onDelete={onDelete} />
      )}
    </Layout>
  )
}

export default SearchBar
