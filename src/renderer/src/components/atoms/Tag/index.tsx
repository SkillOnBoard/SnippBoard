import { PropsWithChildren, useMemo } from 'react'

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
  const selectedColor = useMemo(
    () =>
      defaultColor ? defaultColor : colorsNames[Math.floor(Math.random() * colorsNames.length)],
    []
  )
  const color = colors[selectedColor]

  const className = [
    'grid grid-flow-col auto-cols-max items-center bg-gray-700 text-sm font-medium px-3 py-0.5 rounded-lg gap-1 border whitespace-nowrap',
    color
  ].join(' ')

  return (
    <div className={className}>
      <span className="flex flex-w-min">{children}</span>
      {onClose && (
        <div className="cursor-pointer" onClick={onClose}>
          <span>x</span>
        </div>
      )}
    </div>
  )
}

export default Tag
