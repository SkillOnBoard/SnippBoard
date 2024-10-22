import { createRef, useEffect, useState } from 'react'
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
  // TODO: fetch tags from API
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
  const [selectedTags, setSelectedTags] = useState<string[]>(values)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(predefinedTags)
  const [inputValue, setInputValue] = useState<string>('')
  const hasTags = !!selectedTags.length
  const inputRef = createRef<HTMLInputElement>()

  const addTag = (tagText: string): void => {
    setSelectedTags([tagText]) // Only allows 1 item, otherwise [...selectedTags, tagText]
    onChange([tagText])
    cleanInput()
    setIsDropdownOpen(false)
  }

  const cleanInput = (): void => {
    setInputValue('')
    setFilteredSuggestions(predefinedTags)
  }

  const removeTag = (index): void => {
    const newSelectedTags = selectedTags.filter((_, i) => i !== index)
    setSelectedTags([...newSelectedTags])
  }

  const handleSearch = (event): void => {
    setInputValue(event.target.value.toLowerCase().trim())
  }

  useEffect(() => {
    if (inputValue && !isDropdownOpen) {
      setIsDropdownOpen(true)
    }
    const matchedTags = predefinedTags.filter((tag) => tag.includes(inputValue))
    setFilteredSuggestions(matchedTags)
  }, [inputValue])

  const options = filteredSuggestions.concat(inputValue)

  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white">{label}</label>
      <div className="flex flex-row justify-between items-center bg-gray-800 border border-gray-900 text-sm rounded-lg block w-full px-4 py-2 outline-none gap-2">
        {hasTags && (
          <div className="flex flex-row flex-wrap align-middle gap-2">
            {selectedTags.slice(0, 2).map((tag, index) => (
              <Tag key={index} onClose={() => removeTag(index)}>
                {tag}
              </Tag>
            ))}
            {selectedTags.length > 2 && <Tag key="plus">+{selectedTags.length - 2}</Tag>}
          </div>
        )}
        {/* TODO: Add placeholder copy */}
        <input
          ref={inputRef}
          placeholder={hasTags ? '' : placeholder}
          value={inputValue}
          onChange={handleSearch}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          required
          className="bg-inherit outline-none w-full"
        />

        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {isDropdownOpen ? (
            <Icon name="chevron-up" stroke={2} />
          ) : (
            <Icon name="chevron-down" stroke={2} />
          )}
        </div>
      </div>

      {isDropdownOpen && <Dropdown onSelect={addTag} options={options} />}
    </div>
  )
}

export default TagPicker
