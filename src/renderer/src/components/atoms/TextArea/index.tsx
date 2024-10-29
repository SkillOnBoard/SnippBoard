type Props = {
  value: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
}

const TextArea = ({
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false
}: Props): JSX.Element => {
  return (
    <textarea
      rows={4}
      className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none placeholder:text-gray-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  )
}

export default TextArea
