import LabeledInput from '@renderer/components/molecules/LabeledInput'
import TagPicker from '@renderer/components/molecules/TagPicker'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LabeledTextArea from '@renderer/components/molecules/LabeledTextArea'
import { useTranslation } from 'react-i18next'
import Footer from '@renderer/components/Footer'

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

  const submit = (event): void => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2  border rounded-full"
        onClick={() => navigate('/')}
      >
        {' '}
        Back to search{' '}
      </button>
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
              value={form.labels}
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
      {/* TODO: Send actions */}
      <Footer tempText={'/ for actions'} />
    </>
  )
}

export default Create
