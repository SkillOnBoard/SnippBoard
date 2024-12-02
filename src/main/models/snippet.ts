import { DataTypes, Model } from 'sequelize'
import sequelize from '../database'

class Snippet extends Model {
  public title!: string
  public content!: string
}

Snippet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'Snippet',
    tableName: 'snippets'
  }
)

export default Snippet
