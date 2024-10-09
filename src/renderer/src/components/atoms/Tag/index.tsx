import { PropsWithChildren } from 'react'

const colors = {
  green: 'border-green-500 text-green-500',
  blue: 'border-blue-500 text-blue-500',
  cyan: 'border-cyan-500 text-cyan-500',
  amber: 'border-amber-500 text-amber-500'
}

const colorsNames = Object.keys(colors)

type Props = {
  onClose?: () => void
  defaultColor?: (typeof colorsNames)[number]
}

const Tag = ({ onClose, defaultColor, children }: PropsWithChildren<Props>): JSX.Element => {
  const selectedColor = defaultColor
    ? defaultColor
    : colorsNames[Math.floor(Math.random() * colorsNames.length)]
  const color = colors[selectedColor]

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
