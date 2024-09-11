import { PropsWithChildren } from 'react'

type Props = {
  onClose?: () => void
}

const Tag = ({ onClose, children }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className="flex flex-row align-middle bg-blue-100 text-blue-800 text-sm font-medium px-3 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 gap-1 ">
      <div className="flex flex-w-min">{children}</div>
      {onClose && <div onClick={onClose}>x</div>}
    </div>
  )
}

export default Tag
