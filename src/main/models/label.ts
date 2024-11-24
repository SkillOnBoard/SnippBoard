import { DataTypes, Model } from 'sequelize'
import sequelize from '../database'
import Snippet from './snippet'

class Label extends Model {
  public title!: string
}

Label.init(
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
    snippetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Snippet,
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    modelName: 'Label',
    tableName: 'labels'
  }
)

Snippet.hasMany(Label, {
  foreignKey: 'snippetId',
  as: 'labels',
  onDelete: 'SET NULL'
})

Label.belongsTo(Snippet, {
  foreignKey: 'snippetId',
  as: 'snippet'
})

export default Label
