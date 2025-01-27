import { Field } from './Field'

export class Form<T = any> {
  private fields: Record<string, Field>

  constructor(fields: Record<string, Field>) {
    this.fields = fields
  }

  get(fieldName: string): Field {
    return this.fields[fieldName]
  }

  setField(fieldName: string, value: T): void {
    this.fields[fieldName] = new Field(value)
  }

  setFields(fields: Record<string, T>): void {
    Object.keys(fields).forEach((fieldName) => {
      this.setField(fieldName, fields[fieldName])
    })
  }

  getValues(): Record<string, unknown> {
    return Object.keys(this.fields).reduce(
      (values, key) => {
        values[key] = this.fields[key].value
        return values
      },
      {} as Record<string, unknown>
    )
  }
}
