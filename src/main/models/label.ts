import { DataTypes, Model } from 'sequelize'
import sequelize from '../database'

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
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'Label',
    tableName: 'labels'
  }
)

export default Label
