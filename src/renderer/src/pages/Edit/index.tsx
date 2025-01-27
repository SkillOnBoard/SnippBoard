import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '@renderer/components/Layout'
import { useNotifications } from '@renderer/contexts/NotificationsContext'
import SnippetForm from '@renderer/components/SnippetForm'
import { useListSnippets } from '@renderer/hooks/useListSnippets'
import { useUpdateSnippet } from '@renderer/hooks/useUpdateSnippet'
import Snippet from '@renderer/components/forms/Snippet'

const Edit = (): JSX.Element | null => {
  const navigate = useNavigate()
  const { id } = useParams()
  const ids: number[] = id ? [+id] : []
  const { data, loading } = useListSnippets({ ids })
  const snippet = data?.[0]
  const snippetForm = new Snippet(snippet)
  const [form, setForm] = useState<Snippet>(snippetForm)

  const { t } = useTranslation()
  const { addNotification } = useNotifications()
  const [updateSnippet] = useUpdateSnippet({
    onSuccess: () => {
      addNotification({ type: 'success', description: t('updated.notifications.success') })
      navigate('/')
    },
    onFailure: (error) => {
      addNotification({ type: 'error', description: t('updated.notifications.error', { error }) })
      console.log('error', error)
    }
  })

  useEffect(() => {
    window.electron?.ipcRenderer.send('resize-window', 'big')
  }, [])

  useEffect(() => {
    if (snippet) setForm(snippetForm)
  }, [snippet])

  const submit = (): void => {
    updateSnippet({
      ...form.getValues(),
      labels: form.get('labels').value?.map((label) => {
        return { id: label.id, title: label.title }
      })
    })
  }

  // TODO: Show loading state
  if (loading || !data) return null

  return (
    <Layout
      back={() => navigate('/')}
      header={t('create.header')}
      footerActions={[
        {
          label: t('actions.back'),
          keyboardKeys: ['Escape'],
          callback: () => navigate('/'),
          position: 'left'
        },
        {
          label: t('actions.save'),
          keyboardKeys: ['Meta', 'Enter'],
          callback: submit
        }
      ]}
    >
      <SnippetForm form={form} setForm={setForm} onSubmit={submit} />
    </Layout>
  )
}

export default Edit
