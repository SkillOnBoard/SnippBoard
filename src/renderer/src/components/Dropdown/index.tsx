import { useCallback, useEffect, useState } from 'react'
import Input from '@renderer/components/atoms/Input'

type Props = {
  placeholder: string
  onSelect: (value: string) => void
}

const Dropdown = ({ placeholder = 'Search', onSelect }: Props): JSX.Element => {
  const predefinedTags = [
    'programming',
    'design',
    'web development',
    'javascript',
    'python',
    'css',
    'html',
    'backend',
    'frontend',
    'database'
    // Add more predefined tags as needed
  ]
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(predefinedTags)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleKeyDown = useCallback(
    (event): void => {
      if (event.key === 'ArrowDown') {
        setSelectedIndex(
          selectedIndex < filteredSuggestions.length - 1 ? selectedIndex + 1 : selectedIndex
        )
      } else if (event.key === 'ArrowUp') {
        setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0)
      } else if (event.key === 'Enter') {
        if (selectedIndex >= 0) onSelect(filteredSuggestions[selectedIndex])
      }
    },
    [selectedIndex, onSelect, filteredSuggestions]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const handleSearch = (event): void => {
    const inputValue = event.target.value.toLowerCase().trim()
    const matchedTags = predefinedTags.filter((tag) => tag.includes(inputValue))
    setFilteredSuggestions(matchedTags)
  }

  return (
    <div className="z-10 bg-gray-800 rounded-lg shadow w-60 dark:bg-gray-700 absolute">
      <Input placeholder={placeholder} onChange={handleSearch} required autoFocus />
      <ul className="h-48 py-2 overflow-y-auto" aria-labelledby="dropdownUsersButton">
        {filteredSuggestions.map((tag, index) => (
          <li
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
