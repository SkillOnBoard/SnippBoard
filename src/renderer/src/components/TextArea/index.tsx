type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ label, placeholder, onChange, value }: Props): JSX.Element => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white">{label}</label>
      <textarea
        rows={4}
        className="bg-inherit border border-gray-300 text-sm rounded-lg block w-full p-2.5 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default TextArea
