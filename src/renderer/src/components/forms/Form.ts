import { Field } from './Field'

export class Form {
  private fields: Record<string, Field>

  constructor(fields: Record<string, Field>) {
    this.fields = fields
  }

  get(fieldName: string): Field {
    return this.fields[fieldName]
  }

  setField(fieldName: string, field: Field): void {
    this.fields[fieldName] = field
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
