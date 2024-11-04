import { PropsWithChildren } from 'react'

type Props = {
  color?: string // TODO: define a type for color
}

const Label = ({ children, color = 'text-white' }: PropsWithChildren<Props>): JSX.Element => {
  return <span className={'block text-sm font-medium content-center ' + color}>{children}</span>
}

export default Label
