import Input from '@renderer/components/atoms/Input'
import Label from '@renderer/components/atoms/Label'

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autofocus?: boolean
  required?: boolean
}

const LabeledInput = ({
  label,
  placeholder,
  onChange,
  value,
  autofocus,
  required
}: Props): JSX.Element => {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autofocus={autofocus}
        required={required}
      />
    </div>
  )
}

export default LabeledInput
