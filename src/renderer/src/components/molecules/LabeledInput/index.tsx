import Input from '@renderer/components/atoms/Input'
import Label from '@renderer/components/atoms/Label'

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LabeledInput = ({ label, placeholder, onChange, value }: Props): JSX.Element => {
  return (
    <div>
      <Label>{label}</Label>
      <Input placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
  )
}

export default LabeledInput
