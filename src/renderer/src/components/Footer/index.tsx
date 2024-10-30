import Action from './Action'
import { KeyBinding, useKeyBindings } from '@renderer/hooks/useKeyBindings'

type Props = {
  keyBindings: KeyBinding[]
}

const Footer = ({ keyBindings }: Props): JSX.Element => {
  useKeyBindings(keyBindings)

  return (
    <div className="fixed bottom-0 w-full left-0">
      <hr className="border-gray-700 " />
      <div className="grid place-items-end py-2 px-8">
        <div className="flex flex-row gap-2">
          {keyBindings.map(({ cmd, callback }, index) => (
            <Action key={index} cmd={cmd} callback={callback} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
