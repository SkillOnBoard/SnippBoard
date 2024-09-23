type IconsTypes = 'chevron-down' | 'arrow-left'
type Sizes = 'small' | 'medium' | 'large'
type Strokes = 1 | 2 | 3 | 4 | 5

type ContentProps = {
  name: IconsTypes
}

type Props = ContentProps & {
  size?: Sizes
  stroke?: Strokes
}

const sizes = {
  small: 'size-3',
  medium: 'size-4',
  large: 'size-5'
}

const strokes = {
  1: 'stroke-1',
  2: 'stroke-2',
  3: 'stroke-3',
  4: 'stroke-4',
  5: 'stroke-5'
}

const Content = ({ name }: ContentProps): JSX.Element => {
  switch (name) {
    case 'chevron-down':
      return <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />

    case 'arrow-left':
      return <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />

    default:
      return <></>
  }
}

const Icon = ({ name, size = 'medium', stroke = 3 }: Props): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={stroke}
      className={`${sizes[size]} ${strokes[stroke]}`}
    >
      <Content name={name} />
    </svg>
  )
}

export default Icon
