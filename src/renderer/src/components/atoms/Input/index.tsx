type Props = {
  value?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const LabeledInput = ({ value, placeholder, onChange, required = false }: Props): JSX.Element => {
  return (
    <input
      type="text"
      className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none placeholder:text-gray-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
}

export default LabeledInput
