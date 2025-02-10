type Props = {
  value?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autofocus?: boolean
  error?: string | null
}

const LabeledInput = ({
  value,
  placeholder,
  onChange,
  required = false,
  autofocus = false,
  error
}: Props): JSX.Element => {
  return (
    <div>
      <input
        type="text"
        className={
          'bg-gray-700 border text-sm rounded-lg block w-full p-2.5 outline-none placeholder:text-gray-300 ' +
          (error ? 'border-red-500' : 'border-gray-500')
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autofocus}
      />
    </div>
  )
}

export default LabeledInput
