import { useEffect } from 'react'
import { KeyboardKeysValue } from '@renderer/utils/keys'

export interface KeyBinding {
  cmd: KeyboardKeysValue[]
  callback: () => void
}

export const useKeyBindings = (props: KeyBinding[]): void => {
  const currentlyPressedKeys = new Set()

  const areAllKeyPressed = (keys: string[]): boolean => {
    for (const key of keys) {
      if (!currentlyPressedKeys.has(key)) return false
    }
    return true
  }

  const bindingsKeyDown = (e: KeyboardEvent): void => {
    currentlyPressedKeys.add(e.key)
    console.log({ key: e.key })
    props.forEach((binding) => {
      if (areAllKeyPressed(binding.cmd)) {
        binding.callback()
      }
    })
  }

  const bindingsKeyUp = (e: KeyboardEvent): void => {
    currentlyPressedKeys.delete(e.key)
  }

  useEffect(() => {
    document.addEventListener('keydown', bindingsKeyDown)
    document.addEventListener('keyup', bindingsKeyUp)
    return (): void => {
      document.removeEventListener('keydown', bindingsKeyDown)
      document.removeEventListener('keyup', bindingsKeyUp)
    }
  }, [props])
}
