import { SequelizeStorage, Umzug } from 'umzug'
import path from 'path'
import sequelize from './database'

const migrator = new Umzug({
  migrations: {
    glob: path.join(__dirname, '../migrations/*.js')
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function runMigrations() {
  await migrator.up()
}
