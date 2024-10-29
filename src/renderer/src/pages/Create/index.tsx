import LabeledInput from '@renderer/components/molecules/LabeledInput'
import TagPicker from '@renderer/components/molecules/TagPicker'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LabeledTextArea from '@renderer/components/molecules/LabeledTextArea'
import { useTranslation } from 'react-i18next'
import Header from '@renderer/components/Header'
import Footer from '@renderer/components/Footer'
import { useCreateSnippet } from '@renderer/hooks/useCreateSnippet'
import Button from '@renderer/components/atoms/Button'
import { useListTags } from '@renderer/hooks/useListTags'
import { useCreateTag } from '@renderer/hooks/useCreateTag'

type CreateForm = {
  title: string
  description: string
  labels: string[]
}

function Create(): JSX.Element {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateForm>({ title: '', description: '', labels: [] })
  const { t } = useTranslation()
  const { data: predefinedTags } = useListTags()

  useEffect(() => {
    window.electron?.ipcRenderer.send('resize-window', 'big')
  }, [])

  const [createSnippet] = useCreateSnippet({
    onSuccess: () => navigate('/'),
    onFailure: (error) => console.log('error', error)
  })

  const [createTag] = useCreateTag({
    onFailure: (error) => console.log('error', error)
  })

  const submit = (): void => {
    form.labels.forEach((label) => {
      if (!predefinedTags?.includes(label)) createTag(label)
    })
    createSnippet(form)
  }

  return (
    <div className="fixed w-full h-full left-0 top-0 bg-gray-800 border border-gray-700">
      <Header tempText={'Save code'} />
      <div className="p-4 gap-12">
        <form onSubmit={submit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
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
                predefinedTags={predefinedTags}
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

        {/* TODO: Send actions */}
        <Footer tempText={'/ for actions'} />
      </div>
    </div>
  )
}

export default Create
