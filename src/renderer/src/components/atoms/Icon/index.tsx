import ArrowDown from './icons/ArrowDown'
import ArrowLeft from './icons/ArrowLeft'
import ArrowRight from './icons/ArrowRight'
import ArrowUp from './icons/ArrowUp'
import Back from './icons/Back'
import ChevronDown from './icons/ChevronDown'
import Command from './icons/Command'
import Enter from './icons/Enter'
import KeyC from './icons/KeyC'
import Search from './icons/Search'
import Slash from './icons/Slash'

export type IconType =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'back'
  | 'chevron-down'
  | 'chevron-up'
  | 'command'
  | 'enter'
  | 'key-c'
  | 'slash'
  | 'search'

type Props = {
  name: IconType
}

const Icon = ({ name }: Props): JSX.Element => {
  switch (name) {
    case 'arrow-down':
      return <ArrowDown />

    case 'arrow-left':
      return <ArrowLeft />

    case 'arrow-right':
      return <ArrowRight />

    case 'arrow-up':
      return <ArrowUp />

    case 'back':
      return <Back />

    case 'chevron-up':
      return <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />

    case 'chevron-down':
      return <ChevronDown />

    case 'command':
      return <Command />

    case 'enter':
      return <Enter />

    case 'key-c':
      return <KeyC />
    case 'search':
      return <Search />
    case 'slash':
      return <Slash />

    default:
      return <></>
  }
}

export default Icon
