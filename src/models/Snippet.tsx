// Define una interfaz para los tipos de datos del usuario
export interface SnippetType {
  title: string
  labels: string[]
  description: string
}

// Crea una clase modelo para el usuario
export class SnippetModel {
  static create(snippet: SnippetType): void {
    console.log(snippet)
  }

  // Método para obtener todos los usuarios
  static read(): SnippetType[] {
    return []
  }
}
