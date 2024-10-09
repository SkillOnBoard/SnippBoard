import Icon from '@renderer/components/atoms/Icon'
import Label from '@renderer/components/atoms/Label'

type Props = {
  shortcut: string
  onClick: () => void
}

const icons = {
  ArrowDown: 'arrow-down',
  ArrowUp: 'arrow-up',
  Enter: 'enter',
  Escape: 'arrow-left'
}

const Action = ({ shortcut, onClick }: Props): JSX.Element => {
  const label = `to ${shortcut}` // TODO: Add translation
  const icon = icons[shortcut] || 'command'
  return (
    <div className="flex flex-row gap-2 items-center text-center align-middle" onClick={onClick}>
      <Icon name={icon} size="large" stroke={2} />
      <Label>{label}</Label>
    </div>
  )
}

export default Action
