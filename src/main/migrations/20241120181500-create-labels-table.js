const { Sequelize } = require('sequelize')

async function up({ context: queryInterface }) {
  await queryInterface.createTable('labels', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  })
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('labels')
}

module.exports = { up, down }
