import path from 'path'
import { app } from 'electron'
import { Sequelize } from 'sequelize'

const dbPath = path.join(app.getPath('userData'), 'app-data.sqlite')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
})

export default sequelize
