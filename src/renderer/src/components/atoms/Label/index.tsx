import { PropsWithChildren } from 'react'

const Label = ({ children }: PropsWithChildren): JSX.Element => {
  return <label className="block mb-2 text-sm font-medium dark:text-white">{children}</label>
}

export default Label
