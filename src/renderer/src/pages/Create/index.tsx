import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreateSnippet } from '@renderer/hooks/useCreateSnippet'
import Layout from '@renderer/components/Layout'
import { useNotifications } from '@renderer/contexts/NotificationsContext'
import SnippetForm from '@renderer/components/SnippetForm'
import Snippet, { Errors } from '@renderer/components/forms/Snippet'

function Create(): JSX.Element {
  const navigate = useNavigate()
  const [form, setForm] = useState<Snippet>(new Snippet())
  const [errors, setErrors] = useState<Errors>({})
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
    const errors = form.validate()
    if (Object.keys(errors).length) return setErrors(errors)

    createSnippet({
      title: form.get('title').value,
      content: form.get('content').value,
      labels: form.get('labels').value.map((label) => {
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
      <SnippetForm form={form} setForm={setForm} onSubmit={submit} errors={errors} />
    </Layout>
  )
}

export default Create
