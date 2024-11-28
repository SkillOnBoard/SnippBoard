import Snippet from './snippet'
import Label from './label'
import sequelize from '../database'
import { DataTypes, Model } from 'sequelize'

// class SnippetLabel extends Model {}

// SnippetLabel.init(
//   {
//     snippetId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Snippet,
//         key: 'id'
//       },
//       onDelete: 'CASCADE'
//     },
//     labelId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Label,
//         key: 'id'
//       },
//       onDelete: 'CASCADE'
//     }
//   },
//   {
//     sequelize,
//     modelName: 'SnippetLabel',
//     tableName: 'snippet_label'
//   } 
// )

// Definir la relación N:N
Snippet.belongsToMany(Label, {
  through: 'snippet_label', // Nombre de la tabla intermedia
  foreignKey: 'snippetId',
  otherKey: 'labelId',
  as: 'labels' // Alias para las etiquetas de un snippet
})

Label.belongsToMany(Snippet, {
  through: 'snippet_label', // Nombre de la tabla intermedia
  foreignKey: 'labelId',
  otherKey: 'snippetId',
  as: 'snippets' // Alias para los snippets de una etiqueta
})


export { Snippet, Label }
