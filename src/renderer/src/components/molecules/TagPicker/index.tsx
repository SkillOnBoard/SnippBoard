import { useState } from 'react'
import Dropdown from '@renderer/components/Dropdown'
import Tag from '@renderer/components/atoms/Tag'
import Icon from '@renderer/components/atoms/Icon'

type Props = {
  label: string
  placeholder: string
  values: string[]
  onChange: (value: string[]) => void
}

const TagPicker = ({ label, placeholder, onChange, values }: Props): JSX.Element => {
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'programming',
    'design',
    'web development'
  ])
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

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
  console.log(filteredSuggestions)
  console.log(selectedTags)

  const handleSearch = (event): void => {
    const inputValue = event.target.value.toLowerCase().trim()
    const matchedTags = predefinedTags.filter((tag) => tag.includes(inputValue))
    setFilteredSuggestions(matchedTags)
  }

  const addTag = (tagText: string): void => {
    setSelectedTags([...selectedTags, tagText])
    onChange(selectedTags)
  }

  const removeTag = (index): void => {
    const newSelectedTags = selectedTags.filter((_, i) => i !== index)
    setSelectedTags([...newSelectedTags])
  }

  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white">{label}</label>
      <div
        className="flex flex-row justify-between items-center bg-gray-800 border border-gray-900 text-sm rounded-lg block w-full px-4 py-2 outline-none"
        placeholder={placeholder}
        onChange={handleSearch}
        onFocus={() => setIsDropdownOpen(!isDropdownOpen)}
        required
      >
        {/* Placeholder */}
        {!selectedTags.length && (
          <span className="text-gray-600 dark:text-gray-400">{placeholder}</span>
        )}
        <div id="tags-container" className="flex flex-row flex-wrap align-middle gap-2">
          {selectedTags.slice(0, 2).map((tag, index) => (
            <Tag key={index} onClose={() => removeTag(index)}>
              {tag}
            </Tag>
          ))}
          {selectedTags.length > 2 && <Tag key="plus">+{selectedTags.length - 2}</Tag>}
        </div>
        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Icon name="chevron-down" stroke={2} />
        </div>
      </div>
      {/* <div
        id="tags-suggestions"
        className="mt-2 border border-gray-300 rounded-lg shadow-md"
        style={{
          maxHeight: '8rem',
          overflowY: 'auto'
        }}
      >
        {filteredSuggestions.map((tag) => (
          <div
            key={tag}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => addTag(tag)}
            onKeyDown={() => addTag(tag)}
          >
            {tag}
          </div>
        ))}
      </div> */}

      {isDropdownOpen && <Dropdown id="dropdownUsers" placeholder="Search" onSelect={addTag} />}
    </div>
  )
}

export default TagPicker
