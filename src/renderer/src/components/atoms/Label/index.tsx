import { PropsWithChildren } from 'react'

type Props = {
  color?: string // TODO: define a type for color
}

const Label = ({ children, color = 'text-white' }: PropsWithChildren<Props>): JSX.Element => {
  const labelStyle = `block text-sm font-medium content-center ${color}`
  return <span className={labelStyle}>{children}</span>
}

export default Label
