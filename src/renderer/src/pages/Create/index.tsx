import Input from '@renderer/components/Input'
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
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              label="Name"
              placeholder="Code name"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <hr className="border-gray-600" />
          </div>

          <div>
            <input
              type="text"
              className="w-full px-4 py-2 text-2xl outline-none bg-inherit"
              placeholder="Label"
              value={form.labels}
              onChange={() => setForm({ ...form, labels: ['Test'] })}
            />
            <hr className="border-gray-600" />
          </div>
        </div>

        <Input
          label="Code"
          placeholder="Create your snippet"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <hr className="border-gray-600" />
      </form>
    </>
  )
}

export default Create
