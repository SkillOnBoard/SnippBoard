import { createRef, useEffect, useState } from 'react'
import Dropdown from '@renderer/components/Dropdown'
import Tag from '@renderer/components/atoms/Tag'
import Icon from '@renderer/components/atoms/Icon'

type Props = {
  label: string
  placeholder: string
  values: string[]
  onChange: (value: string[]) => void
  predefinedTags?: string[]
}

const TagPicker = ({
  label,
  placeholder,
  onChange,
  values,
  predefinedTags = []
}: Props): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const hasTags = !!values.length
  const inputRef = createRef<HTMLInputElement>()
  const filteredOptions = predefinedTags.filter((tag) => tag.includes(inputValue))
  const options = inputValue ? filteredOptions.concat(inputValue) : filteredOptions

  const addTag = (tagText: string): void => {
    onChange([tagText]) // Only allows 1 item, otherwise [...selectedTags, tagText]
    cleanInput()
    setIsDropdownOpen(false)
  }

  const cleanInput = (): void => {
    setInputValue('')
  }

  const removeTag = (index): void => {
    const newSelectedTags = values.filter((_, i) => i !== index)
    onChange([...newSelectedTags])
  }

  const handleSearch = (event): void => {
    setInputValue(event.target.value.toLowerCase().trim())
  }

  useEffect(() => {
    if (inputValue && !isDropdownOpen) setIsDropdownOpen(true)
  }, [inputValue])

  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white">{label}</label>
      <div className="flex flex-row justify-between items-center bg-gray-800 border border-gray-900 text-sm rounded-lg block w-full px-4 py-2 outline-none gap-2">
        {hasTags && (
          <div className="flex flex-row flex-wrap align-middle gap-2">
            {values.slice(0, 2).map((tag, index) => (
              <Tag key={index} onClose={() => removeTag(index)}>
                {tag}
              </Tag>
            ))}
            {values.length > 2 && <Tag key="plus">+{values.length - 2}</Tag>}
          </div>
        )}
        <input
          ref={inputRef}
          placeholder={hasTags ? '' : placeholder}
          value={inputValue}
          onChange={handleSearch}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          required
          className="bg-inherit outline-none w-full placeholder:text-gray-600"
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
