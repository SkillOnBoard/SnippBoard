import Snippet from './snippet'
import Label from './label'

Snippet.belongsToMany(Label, {
  through: 'snippet_label',
  foreignKey: 'snippetId',
  otherKey: 'labelId',
  as: 'labels'
})

Label.belongsToMany(Snippet, {
  through: 'snippet_label',
  foreignKey: 'labelId',
  otherKey: 'snippetId',
  as: 'snippets'
})

export { Snippet, Label }
