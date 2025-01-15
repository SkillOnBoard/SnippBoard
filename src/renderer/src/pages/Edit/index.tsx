import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '@renderer/components/Layout'
import { useNotifications } from '@renderer/contexts/NotificationsContext'
import SnippetForm, { SnippetFormType } from '@renderer/components/SnippetForm'
import { useListSnippets } from '@renderer/hooks/useListSnippets'
import { useUpdateSnippet } from '@renderer/hooks/useUpdateSnippet'

const Edit = (): JSX.Element | null => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, loading } = useListSnippets({ ids: [id] })
  const snippet = data?.[0]

  const [form, setForm] = useState<SnippetFormType>({ title: '', content: '', labels: [] })

  console.log({ id, data })
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
    if (snippet) {
      setForm({
        id: snippet.id,
        title: snippet.title,
        content: snippet.content,
        labels: snippet.labels
      })
    }
  }, [snippet])

  const submit = (): void => {
    updateSnippet({
      ...form,
      labels: form.labels?.map((label) => {
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
