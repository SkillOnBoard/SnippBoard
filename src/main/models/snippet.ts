import { DataTypes, Model } from 'sequelize'
import sequelize from '../database'

class Snippet extends Model {
  public id!: number
  public name!: string
  public label!: string
  public description!: string
}

Snippet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Snippet',
    tableName: 'snippets'
  }
)

export default Snippet
