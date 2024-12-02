const { Sequelize } = require('sequelize')

async function up({ context: queryInterface }) {
  await queryInterface.createTable('snippet_label', {
    snippetId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'snippets',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    labelId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'labels',
        key: 'id'
      },
      onDelete: 'CASCADE'
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
  await queryInterface.dropTable('snippet_label')
}

module.exports = { up, down }
