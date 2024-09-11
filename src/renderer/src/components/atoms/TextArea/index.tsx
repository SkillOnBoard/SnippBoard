type Props = {
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}

const TextArea = ({ value, placeholder, onChange, required = false }: Props): JSX.Element => {
  return (
    <textarea
      rows={4}
      className="bg-inherit border border-gray-300 text-sm rounded-lg block w-full p-2.5 outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
}

export default TextArea
