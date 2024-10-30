type IconsTypes =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-up'
  | 'chevron-down'
  | 'chevron-up'
  | 'command'
  | 'enter'
  | 'magnifying-glass'

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
    case 'arrow-down':
      return <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />

    case 'chevron-up':
      return <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />

    case 'arrow-left':
      return <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />

    case 'arrow-up':
      return <path d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />

    case 'chevron-down':
      return <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />

    case 'command':
      return (
        <path d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      )

    case 'enter':
      return <path d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />

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
