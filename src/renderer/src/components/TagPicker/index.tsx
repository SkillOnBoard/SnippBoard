import { useState } from 'react'
import Dropdown from '@renderer/components/Dropdown'

type Props = {
  label: string
  placeholder: string
  values: string[]
  onChange: (value: string[]) => void
}

const TagPicker = ({ label, placeholder, onChange, values }: Props): JSX.Element => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['hola', 'adios'])
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
      <input
        type="text"
        className="bg-inherit border border-gray-300 text-sm rounded-lg block w-full p-2.5 outline-none"
        placeholder={placeholder}
        onChange={handleSearch}
        onFocus={() => setIsDropdownOpen(!isDropdownOpen)}
        required
      />
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

      <div id="tags-container" className="mt-2">
        {selectedTags.map((tag, index) => (
          <div key={tag}>
            <span className="tag-text">{tag}</span>
            <span className="tag-close" data-tag="${tag}" onClick={() => removeTag(index)}>
              x
            </span>
          </div>
        ))}
      </div>

      <p
        id="tags-helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Separate tags with commas. Example: programming, design, web development
      </p>
    </div>
  )
}

export default TagPicker
