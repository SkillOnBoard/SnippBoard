import { KeyBinding, useKeyBindings } from '@renderer/hooks/useKeyBindings'
import { ActionType } from './Action'
import { KeyboardKeys } from '@renderer/utils/keys'

export const useActionKeyBindings = (actions: ActionType[]): void => {
  const keyBindings: KeyBinding[] = actions.map(({ keyboardKeys, callback }) => ({
    cmd: keyboardKeys.map((key) => KeyboardKeys[key]),
    callback: callback || ((): void => {})
  }))

  useKeyBindings(keyBindings)
}
