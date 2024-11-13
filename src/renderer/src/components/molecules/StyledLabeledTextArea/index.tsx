import Label from '@renderer/components/atoms/Label'
import StyledTextArea from '@renderer/components/atoms/StyledTextArea'

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  numOfLines?: number
}

const StyledLabeledTextArea = ({
  label,
  placeholder,
  onChange,
  value,
  numOfLines
}: Props): JSX.Element => {
  return (
    <div className="grid gap-1 max-h-36">
      <Label>{label}</Label>
      <StyledTextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        numOfLines={numOfLines}
        required
      />
    </div>
  )
}

export default StyledLabeledTextArea
