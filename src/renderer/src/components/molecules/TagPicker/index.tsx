import { useEffect, useState } from 'react'
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
  const [selectedTags, setSelectedTags] = useState<string[]>(values)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const addTag = (tagText: string): void => {
    setSelectedTags([tagText]) // Only allows 1 item, otherwise [...selectedTags, tagText]
    onChange([tagText])
    setIsDropdownOpen(false)
  }

  const removeTag = (index): void => {
    const newSelectedTags = selectedTags.filter((_, i) => i !== index)
    setSelectedTags([...newSelectedTags])
  }

  const openDropdown = (): void => {
    setIsDropdownOpen(true)
  }

  const closeDropdown = (): void => {
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    window.addEventListener('focus', openDropdown)
    window.addEventListener('blur', closeDropdown)
    return (): void => {
      window.removeEventListener('focus', openDropdown)
      window.removeEventListener('blur', closeDropdown)
    }
  }, [])

  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white">{label}</label>
      <div className="flex flex-row justify-between items-center bg-gray-800 border border-gray-900 text-sm rounded-lg block w-full px-4 py-2 outline-none">
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

      {isDropdownOpen && <Dropdown placeholder="Search" onSelect={addTag} />}
    </div>
  )
}

export default TagPicker
