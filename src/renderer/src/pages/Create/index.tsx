import LabeledInput from '@renderer/components/molecules/LabeledInput'
import TagPicker from '@renderer/components/molecules/TagPicker'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LabeledTextArea from '@renderer/components/molecules/LabeledTextArea'
import { useTranslation } from 'react-i18next'
import Header from '@renderer/components/Header'
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

    // Send the form to the main process
    window.electron.ipcRenderer.send('create-snippet', form)

    // Listen for the response
    window.api.createSnippetResponse((event, response) => {
      if (response.status === 'success') {
        console.log('snippets list after creation', response.message)
      }
    })
  }

  return (
    <div className="fixed w-full left-0 top-0">
      <Header tempText={'Save code'} />
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

        <button onClick={submit}>{t('create.submit')}</button>

        {/* TODO: Send actions */}
        <Footer tempText={'/ for actions'} />
      </div>
    </div>
  )
}

export default Create
