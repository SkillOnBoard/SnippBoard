import { Form } from './Form'
import { Field } from './Field'

interface SnippetFields {
  id?: number
  title?: string
  content?: string
  labels?: Label[]
}

export default class Snippet extends Form {
  constructor(fields: SnippetFields = {}) {
    super({
      id: new Field<number | null>(fields.id || null),
      title: new Field<string>(fields.title || ''),
      content: new Field<string>(fields.content || ''),
      labels: new Field<Label[]>(fields.labels || [])
    })
  }

  // Validación personalizada para MyForm
  validate(): boolean {
    let hasError = false

    const titleField = this.get('title')
    if (titleField && !titleField.value) {
      titleField.setError('Title is required.')
      hasError = true
    } else if (titleField) {
      titleField.setError(null)
    }

    const contentField = this.get('content')
    if (contentField && !contentField.value) {
      contentField.setError('Content is required.')
      hasError = true
    } else if (contentField) {
      contentField.setError(null)
    }

    return !hasError
  }
}
