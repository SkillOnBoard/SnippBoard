import ArrowDown from './icons/ArrowDown'
import ArrowLeft from './icons/ArrowLeft'
import ArrowRight from './icons/ArrowRight'
import ArrowUp from './icons/ArrowUp'
import Back from './icons/Back'
import ChevronDown from './icons/ChevronDown'
import ChevronUp from './icons/ChevronUp'
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

const Components = {
  'arrow-down': <ArrowDown />,
  'arrow-left': <ArrowLeft />,
  'arrow-right': <ArrowRight />,
  'arrow-up': <ArrowUp />,
  back: <Back />,
  'chevron-up': <ChevronUp />,
  'chevron-down': <ChevronDown />,
  command: <Command />,
  enter: <Enter />,
  'key-c': <KeyC />,
  search: <Search />,
  slash: <Slash />
}

const Icon = ({ name }: Props): JSX.Element => {
  return Components[name] || <></>
}

export default Icon
