import LabeledInput from '@renderer/components/molecules/LabeledInput'
import TagPicker from '@renderer/components/molecules/TagPicker'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LabeledTextArea from '@renderer/components/molecules/LabeledTextArea'
import { useTranslation } from 'react-i18next'
import { useCreateSnippet } from '@renderer/hooks/useCreateSnippet'
import Layout from '@renderer/components/Layout'
import Button from '@renderer/components/atoms/Button'

type CreateForm = {
  title: string
  description: string
  labels: string[]
}

function Create(): JSX.Element {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateForm>({ title: '', description: '', labels: [] })
  const { t } = useTranslation()

  useEffect(() => {
    window.electron?.ipcRenderer.send('resize-window', 'big')
  }, [])

  const [createSnippet, { error }] = useCreateSnippet()

  const submit = (): void => {
    navigate('/')
    createSnippet(form)
    if (error) {
      console.log('error', error)
    }
  }

  return (
    <Layout
      back={() => navigate('/')}
      footerActions={[
        {
          shortcut: 'Escape',
          onClick: () => navigate('/')
        },
        {
          shortcut: 'Enter',
          onClick: submit
        }
      ]}
    >
      <div className="p-4">
        <form onSubmit={submit}>
          <div className="gap-12">
            <div className="grid grid-cols-2 gap-2">
              <LabeledInput
                label={t('create.fields.name.label')}
                placeholder={t('create.fields.name.label')}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <TagPicker
                label={t('create.fields.label.label')}
                placeholder={t('create.fields.label.placeholder')}
                values={form.labels}
                onChange={(values) => setForm({ ...form, labels: values })}
              />
            </div>

            <LabeledTextArea
              label={t('create.fields.code.label')}
              placeholder={t('create.fields.code.placeholder')}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </form>
        <div className="pt-4">
          <Button onClick={submit}>{t('create.submit')}</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Create
