import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreateSnippet } from '@renderer/hooks/useCreateSnippet'
import Layout from '@renderer/components/Layout'
import { useNotifications } from '@renderer/contexts/NotificationsContext'
import SnippetForm, { CreateForm } from '@renderer/components/SnippetForm'

function Create(): JSX.Element {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateForm>({ title: '', content: '', labels: [] })
  const { t } = useTranslation()
  const { addNotification } = useNotifications()

  useEffect(() => {
    window.electron?.ipcRenderer.send('resize-window', 'big')
  }, [])

  const [createSnippet] = useCreateSnippet({
    onSuccess: () => {
      addNotification({ type: 'success', description: t('create.notifications.success') })
      navigate('/')
    },
    onFailure: (error) => {
      addNotification({ type: 'error', description: t('create.notifications.error', { error }) })
      console.log('error', error)
    }
  })

  const submit = (): void => {
    createSnippet({
      title: form.title,
      content: form.content,
      labels: form.labels?.map((label) => {
        return { id: label.id, title: label.title }
      })
    })
  }

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

export default Create
