import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  onSelect: (value: Label) => void
  options: Label[]
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
    <div className="z-10 bg-gray-700 rounded-lg shadow min-w-60 max-w-xs dark:bg-gray-700 absolute border border-gray-600 mt-2">
      <ul className="grid gap-1 p-1 overflow-hidden max-h-48">
        {options.map((label, index) => (
          <li
            key={index}
            ref={(el) => (rowRefs.current[index] = el)}
            className={
              'rounded-lg hover:bg-gray-800 h-min cursor-pointer ' +
              (selectedIndex === index ? 'bg-gray-800' : 'bg-gray-700')
            }
            onClick={() => onSelect(options[selectedIndex])}
            onMouseOver={() => setSelectedIndex(index)}
          >
            <span className={'flex justify-between items-center p-2'}>{label.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
