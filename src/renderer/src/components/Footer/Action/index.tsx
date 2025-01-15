import Icon from '@renderer/components/atoms/Icon'
import Label from '@renderer/components/atoms/Label'
import { KeyboardKeysType } from '@renderer/utils/keys'

// TODO: use better keys as keys.tsx
const icons = {
  ArrowDown: 'arrow-down',
  ArrowUp: 'arrow-up',
  Backspace: 'back',
  Enter: 'enter',
  Escape: 'back',
  KeyC: 'key-c', // Use KeyC: 'key-c'
  KeyD: 'key-d', // Use KeyD: 'key-d'
  KeyR: 'key-r',
  Meta: 'command',
  Slash: 'slash' // Use Slash: 'slash'
}

export type ActionType = {
  label: string
  keyboardKeys: KeyboardKeysType[]
  callback?: () => void
  hidden?: boolean
  position?: 'left' | 'right'
  disabled?: boolean
}

const Action = ({ action }: { action: ActionType }): JSX.Element => {
  const { label, keyboardKeys, callback } = action

  return (
    <div
      className="flex flex-row gap-2 content-center p-0.5 pr-4 rounded-lg hover:cursor-pointer border bg-gray-800 border-gray-800 hover:bg-gray-700 active:bg-gray-900 active:border active:border-accent no-draggable"
      onClick={callback}
    >
      <div className="flex flex-row gap-0.5">
        {keyboardKeys.map((key) => (
          <Icon key={key} name={icons[key]} />
        ))}
      </div>
      <Label color="text-gray-400">{label}</Label>
    </div>
  )
}

export default Action
