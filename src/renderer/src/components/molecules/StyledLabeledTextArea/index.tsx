import Label from '@renderer/components/atoms/Label'
import StyledTextArea from '@renderer/components/atoms/StyledTextArea'

type Props = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  numOfLines?: number
  error?: string | null
}

const StyledLabeledTextArea = ({
  label,
  placeholder,
  onChange,
  value,
  numOfLines,
  error
}: Props): JSX.Element => {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <div className="max-h-36">
        <StyledTextArea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          numOfLines={numOfLines}
          required
          error={error}
        />
      </div>
    </div>
  )
}

export default StyledLabeledTextArea
