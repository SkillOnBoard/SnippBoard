import Label from '@renderer/components/atoms/Label'
import TextArea from '@renderer/components/atoms/TextArea'

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const LabeledTextArea = ({ label, placeholder, onChange, value }: Props): JSX.Element => {
  return (
    <div>
      <Label>{label}</Label>
      <TextArea placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
  )
}

export default LabeledTextArea
