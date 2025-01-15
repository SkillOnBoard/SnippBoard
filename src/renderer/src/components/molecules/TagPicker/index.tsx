import { createRef, useEffect, useState } from 'react'
import Dropdown from '@renderer/components/Dropdown'
import Tag from '@renderer/components/atoms/Tag'
import Icon from '@renderer/components/atoms/Icon'
import LabelComp from '@renderer/components/atoms/Label'

type Props = {
  label: string
  placeholder: string
  values: Label[]
  onChange: (value: Label[]) => void
  predefinedTags?: Label[]
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
  const filteredOptions = predefinedTags.filter((tag) => tag.title.includes(inputValue))
  const options = inputValue
    ? filteredOptions.concat({ title: inputValue } as Label)
    : filteredOptions
  let timeout: NodeJS.Timeout | null = null

  const addTag = (label: Label): void => {
    onChange([label]) // Only allows 1 item, otherwise [...selectedTags, label]
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
    setInputValue(event.target.value.trim())
  }

  useEffect(() => {
    if (inputValue && !isDropdownOpen) setIsDropdownOpen(true)
  }, [inputValue])

  useEffect(() => {
    return (): void => {
      timeout && clearTimeout(timeout) // Clear timeout on unmount
    }
  }, [timeout])

  const dropdownIcon = isDropdownOpen ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />
  const existOptions = options.length !== 0

  return (
    <div>
      <div className="grid gap-1">
        <LabelComp>{label}</LabelComp>
        <div className="flex flex-row justify-between items-center bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full px-4 py-1 outline-none gap-2 min-h-10 overflow-x-hidden">
          {hasTags && (
            <div className="flex flex-row flex-wrap align-middle gap-2">
              {values.slice(0, 2).map((label, index) => (
                <Tag key={index} onClose={() => removeTag(index)}>
                  {label.title}
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
            // Using setTimeout to prevent the dropdown from closing when clicking on it (blur event)
            onBlur={() => {
              timeout = setTimeout(() => setIsDropdownOpen(false), 500)
              addTag({ title: inputValue } as Label)
            }}
            required
            className="bg-inherit outline-none w-full placeholder:text-gray-50 min-w-0.5"
          />

          <div
            className="cursor-pointer top-1/2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {existOptions ? dropdownIcon : null}
          </div>
        </div>
      </div>

      {isDropdownOpen && existOptions && <Dropdown onSelect={addTag} options={options} />}
    </div>
  )
}

export default TagPicker
