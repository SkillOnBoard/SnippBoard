type IconsTypes = 'chevron-down' | 'chevron-up' | 'arrow-left' | 'magnifying-glass'
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

    case 'chevron-up':
      return <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />

    case 'arrow-left':
      return <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />

    case 'magnifying-glass':
      return (
        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      )

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
      className={`${sizes[size]} ${strokes[stroke]} text-white`}
    >
      <Content name={name} />
    </svg>
  )
}

export default Icon
