import { useEffect } from 'react'
import Action from './Action'

export type Action = {
  shortcut: string
  onClick: () => void
}

type Props = {
  actions: Action[]
}

const Footer = ({ actions }: Props): JSX.Element => {
  useEffect(() => {
    // const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

    const handleKeyDown = (e): void => {
      const action = actions.find((action) => action.shortcut === e.key)
      if (action) {
        e.preventDefault()
        action.onClick()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [actions])

  return (
    <div className="fixed bottom-0 w-full left-0">
      <hr className="border-gray-600 " />
      <div className="grid place-items-end py-2 px-8">
        <div className="flex flex-row gap-2">
          {actions.map(({ shortcut, onClick }, index) => (
            <Action key={index} shortcut={shortcut} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
