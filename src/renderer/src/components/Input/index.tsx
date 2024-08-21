type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ label, placeholder, onChange, value }: Props): JSX.Element => {
  return (
    <>
      <span>{label}</span>
      <input
        type="text"
        className="w-full px-4 py-2 text-2xl outline-none bg-inherit"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default Input
