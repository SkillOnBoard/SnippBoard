import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  onSelect: (value: string) => void
  options: string[]
}

const Dropdown = ({ onSelect, options }: Props): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])

  const handleKeyDown = useCallback(
    (event): void => {
      if (event.key === 'ArrowDown') {
        setSelectedIndex(selectedIndex < options.length - 1 ? selectedIndex + 1 : selectedIndex)
      } else if (event.key === 'ArrowUp') {
        setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0)
      } else if (event.key === 'Enter') {
        if (selectedIndex >= 0) onSelect(options[selectedIndex])
      }
    },
    [selectedIndex, onSelect, options]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [options])

  useEffect(() => {
    if (selectedIndex !== null && rowRefs.current[selectedIndex]) {
      rowRefs.current[selectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <div className="z-10 bg-gray-800 rounded-lg shadow w-60 dark:bg-gray-700 absolute">
      <ul className="h-48 py-2 overflow-y-auto" aria-labelledby="dropdownUsersButton">
        {options.map((tag, index) => (
          <li
            ref={(el) => (rowRefs.current[index] = el)}
            key={index}
            className={
              'hover:bg-gray-600 ' + (selectedIndex === index ? 'bg-gray-700' : 'bg-gray-800')
            }
            onClick={() => onSelect(tag)}
          >
            <span className={'flex justify-between items-center p-2'}>{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
