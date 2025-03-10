import { Form } from './Form'
import { Field } from './Field'

interface SnippetFields {
  id?: number
  title?: string
  content?: string
  labels?: Label[]
}

export interface Errors {
  title?: string
  content?: string
  labels?: string
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
  validate(): Record<string, string> {
    const errors = {}

    // TODO: Add i18n translations
    if (!this.get('title').value) errors['title'] = 'Title is required.'
    if (!this.get('content').value) errors['content'] = 'Content is required.'

    return errors
  }
}
