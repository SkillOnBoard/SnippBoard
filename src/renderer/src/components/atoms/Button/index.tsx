import { PropsWithChildren } from 'react'

type Props = {
  onClick?: () => void
}

const Button = ({ onClick, children }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <button
      className="text-gray-400 hover:cursor-pointer border bg-gray-800 border-gray-800 hover:bg-gray-700 active:bg-gray-900 active:border active:border-accent focus:ring-2 focus:ring-grey-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
