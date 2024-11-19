import { QueryInterface, DataTypes } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('snippets', {
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
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('snippets')
}
