import Input from '@renderer/components/Input'
import TagPicker from '@renderer/components/TagPicker'
import TextArea from '@renderer/components/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type CreateForm = {
  title: string
  description: string
  labels: string[]
}

function Create(): JSX.Element {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateForm>({ title: '', description: '', labels: [] })

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
            <Input
              label="Name"
              placeholder="Code name"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <TagPicker
              label="Label"
              placeholder="Select"
              value={form.labels}
              onChange={(values) => setForm({ ...form, labels: values })}
            />
          </div>

          <TextArea
            label="Code"
            placeholder="Create your snippet"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </form>
    </>
  )
}

export default Create
