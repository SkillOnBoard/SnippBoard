type Props = {
  value?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autofocus?: boolean
}

const LabeledInput = ({
  value,
  placeholder,
  onChange,
  required = false,
  autofocus = false
}: Props): JSX.Element => {
  return (
    <input
      type="text"
      className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none placeholder:text-gray-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoFocus={autofocus}
    />
  )
}

export default LabeledInput
