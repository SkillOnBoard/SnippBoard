import path from 'path'
import { app } from 'electron'
import { Sequelize } from 'sequelize'

// Ruta para la base de datos
const dbPath = path.join(app.getPath('userData'), 'app-data.sqlite')

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
})

export default sequelize
