import ArrowDown from './icons/ArrowDown'
import ArrowLeft from './icons/ArrowLeft'
import ArrowRight from './icons/ArrowRight'
import ArrowUp from './icons/ArrowUp'
import Back from './icons/Back'
import Check from './icons/Check'
import ChevronDown from './icons/ChevronDown'
import ChevronUp from './icons/ChevronUp'
import Command from './icons/Command'
import Enter from './icons/Enter'
import Error from './icons/Error'
import KeyC from './icons/KeyC'
import KeyD from './icons/KeyD'
import KeyR from './icons/KeyR'
import Search from './icons/Search'
import Slash from './icons/Slash'
import Warning from './icons/Warning'

export type IconType =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'back'
  | 'check'
  | 'chevron-down'
  | 'chevron-up'
  | 'command'
  | 'enter'
  | 'error'
  | 'key-c'
  | 'key-d'
  | 'key-r'
  | 'slash'
  | 'search'
  | 'warning'

type Props = {
  name: IconType
}

const Components = {
  'arrow-down': <ArrowDown />,
  'arrow-left': <ArrowLeft />,
  'arrow-right': <ArrowRight />,
  'arrow-up': <ArrowUp />,
  back: <Back />,
  check: <Check />,
  'chevron-up': <ChevronUp />,
  'chevron-down': <ChevronDown />,
  command: <Command />,
  enter: <Enter />,
  error: <Error />,
  'key-c': <KeyC />,
  'key-d': <KeyD />,
  'key-r': <KeyR />,
  search: <Search />,
  slash: <Slash />,
  warning: <Warning />
}

const Icon = ({ name }: Props): JSX.Element => {
  return Components[name] || <></>
}

export default Icon
