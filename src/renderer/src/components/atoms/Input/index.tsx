type Props = {
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const LabeledInput = ({ value, placeholder, onChange, required = false }: Props): JSX.Element => {
  return (
    <input
      type="text"
      className="bg-gray-800 border border-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none placeholder:text-gray-600"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
}

export default LabeledInput
