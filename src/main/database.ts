import path from 'path'
import { app } from 'electron'
import { Sequelize } from 'sequelize'
import { is } from '@electron-toolkit/utils'

const dbName = is.dev ? 'dev-app-data.sqlite' : 'app-data.sqlite'

const dbPath = path.join(app.getPath('userData'), dbName)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
})

export default sequelize
