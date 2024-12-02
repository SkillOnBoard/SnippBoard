import Icon, { type IconType } from '@renderer/components/atoms/Icon'
import Label from '@renderer/components/atoms/Label'
import { NotificationType } from '@renderer/contexts/NotificationsContext'

const icons: Record<string, IconType> = {
  success: 'check',
  error: 'error',
  warning: 'warning'
}

export type Props = {
  notification: NotificationType
}

const Notification = ({ notification }: Props): JSX.Element => {
  return (
    <div className="flex flex-row gap-2 items-center rounded-lg bg-gray-800 transition ease-in-out transition-opacity py-2">
      <Icon name={icons[notification.type]} />
      <Label color="text-gray-400">{notification.description}</Label>
    </div>
  )
}

export default Notification
