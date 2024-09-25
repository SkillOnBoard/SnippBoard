import { PropsWithChildren } from 'react'

type Props = {
  onClose?: () => void
}

const Tag = ({ onClose, children }: PropsWithChildren<Props>): JSX.Element => {
  const colorsClassNames = [
    'border-green-500 text-green-500',
    'border-cyan-500 text-cyan-500',
    'border-amber-500 text-amber-500'
  ]
  const color = colorsClassNames[Math.floor(Math.random() * colorsClassNames.length)]

  const className = [
    'flex flex-row align-middle bg-gray-700 text-sm font-medium px-2.5 py-0.5 rounded gap-1 border',
    color
  ].join(' ')

  return (
    <div className={className}>
      <span className="flex flex-w-min">{children}</span>
      {onClose && <div onClick={onClose}>x</div>}
    </div>
  )
}

export default Tag
