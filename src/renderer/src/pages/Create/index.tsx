import LabeledInput from '@renderer/components/molecules/LabeledInput'
import TagPicker from '@renderer/components/molecules/TagPicker'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyledLabeledTextArea from '@renderer/components/molecules/StyledLabeledTextArea'
import { useTranslation } from 'react-i18next'
import { useCreateSnippet } from '@renderer/hooks/useCreateSnippet'
import Layout from '@renderer/components/Layout'
import { useListTags } from '@renderer/hooks/useListTags'
// import { useCreateTag } from '@renderer/hooks/useCreateTag'

type CreateForm = {
  title: string
  content: string
  labels: string[]
}

function Create(): JSX.Element {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateForm>({ title: '', content: '', labels: [] })
  const { t } = useTranslation()
  const { data: predefinedTags } = useListTags()

  useEffect(() => {
    window.electron?.ipcRenderer.send('resize-window', 'big')
  }, [])

  const [createSnippet] = useCreateSnippet({
    onSuccess: () => navigate('/'),
    onFailure: (error) => console.log('error', error)
  })


  const submit = (): void => {
    createSnippet({
      title: form.title,
      content: form.content,
      labels: form.labels?.map((title) => {
        return { title: title }
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
      <div className="p-4">
        <form onSubmit={submit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <LabeledInput
                label={t('create.fields.name.label')}
                placeholder={t('create.fields.name.label')}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                autofocus
              />

              <TagPicker
                label={t('create.fields.label.label')}
                placeholder={t('create.fields.label.placeholder')}
                values={form.labels}
                onChange={(values) => setForm({ ...form, labels: values })}
                predefinedTags={predefinedTags}
              />
            </div>

            <StyledLabeledTextArea
              label={t('create.fields.code.label')}
              placeholder={t('create.fields.code.placeholder')}
              value={form.content}
              numOfLines={6}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Create
