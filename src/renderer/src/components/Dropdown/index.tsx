import { useState } from 'react'

type Props = {
  placeholder: string
  onSelect: (value: string) => void
}

const Dropdown = ({ placeholder = 'Search', onSelect }: Props): JSX.Element => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

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

  const handleSearch = (event): void => {
    const inputValue = event.target.value.toLowerCase().trim()
    const matchedTags = predefinedTags.filter((tag) => tag.includes(inputValue))
    setFilteredSuggestions(matchedTags)
  }

  return (
    <div className="z-10 bg-gray-700 rounded-lg shadow w-60 dark:bg-gray-700 absolute">
      <input
        type="text"
        className="bg-inherit border border-gray-300 text-sm rounded-lg block w-full p-2.5 outline-none"
        placeholder={placeholder}
        onChange={handleSearch}
        required
      />
      <ul className="h-48 py-2 overflow-y-auto" aria-labelledby="dropdownUsersButton">
        {filteredSuggestions.map((tag, index) => (
          <li key={index} onClick={() => onSelect(tag)}>
            <span className="flex justify-between items-center p-2">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
