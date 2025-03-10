export class Field<T = any> {
  value: T
  error: string | null

  constructor(value: T) {
    this.value = value
    this.error = null
  }

  setValue(value: T): void {
    this.value = value
  }

  setError(error: string | null): void {
    this.error = error
  }
}
