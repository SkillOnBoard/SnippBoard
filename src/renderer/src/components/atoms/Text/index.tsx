import { PropsWithChildren } from 'react'

type Props = {
  color?: string // TODO: define a type for color
}

const Text = ({ children, color = 'text-white' }: PropsWithChildren<Props>): JSX.Element => {
  const labelStyle = `block text-sm font-medium content-center ${color}`
  return <span className={labelStyle}>{children}</span>
}

const Header3 = ({ children, color = 'text-white' }: PropsWithChildren<Props>): JSX.Element => {
  const labelStyle = `block content-center ${color}`
  return <h3 className={labelStyle}>{children}</h3>
}

Text.Header3 = Header3

export default Text
