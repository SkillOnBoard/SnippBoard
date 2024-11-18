import Action, { ActionType } from './Action'
import { useActionKeyBindings } from './useActionKeyBindings'

type Props = {
  actions: ActionType[]
}

const Footer = ({ actions }: Props): JSX.Element => {
  const validActions = actions.filter((action) => !action.hidden)
  const leftActions = validActions.filter((action) => action.position === 'left')
  const rightActions = validActions.filter((action) => !leftActions.includes(action))
  useActionKeyBindings(actions)

  return (
    <div className="fixed bottom-0 w-full left-0 bg-gray-800 draggable">
      <hr className="border-gray-700" />
      <div className="flex flex-cols-2 place-content-between py-1 px-6">
        <div className="flex flex-row gap-2 place-content-start">
          {leftActions.map((action, index) => (
            <Action key={index} action={action} />
          ))}
        </div>
        <div className="flex flex-row gap-2 place-content-end">
          {rightActions.map((action, index) => (
            <Action key={index} action={action} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
