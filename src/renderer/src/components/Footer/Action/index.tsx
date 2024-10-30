import Icon from '@renderer/components/atoms/Icon'
import Label from '@renderer/components/atoms/Label'
import { KeyBinding } from '@renderer/hooks/useKeyBindings'

// TODO: use better keys as keys.tsx
const icons = {
  ArrowDown: 'arrow-down',
  ArrowUp: 'arrow-up',
  Enter: 'enter',
  Escape: 'back',
  c: 'key-c', // Use KeyC: 'key-c'
  Meta: 'command',
  '/': 'slash' // Use Slash: 'slash'
}

const Action = ({ cmd, callback }: KeyBinding): JSX.Element => {
  const label = `to ${cmd}` // TODO: Add translation
  return (
    <div className="flex flex-row gap-2 items-center text-center align-middle" onClick={callback}>
      <div className="flex flex-row gap-0.5">
        {cmd.map((key) => (
          <Icon key={key} name={icons[key]} />
        ))}
      </div>
      <Label color="text-gray-400">{label}</Label>
    </div>
  )
}

export default Action
