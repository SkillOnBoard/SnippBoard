import React, { useEffect, useMemo, useRef } from 'react'

type Props = {
  value: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
  numOfLines?: number
}

const StyledTextArea = ({
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  numOfLines = 4
}: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const lineCount = useMemo(() => value.split('\n').length, [value])
  const [activeLine, setActiveLine] = React.useState(0)
  const linesArr = useMemo(
    () => Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  )

  const lineCounterRef = useRef<HTMLDivElement>(null)

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange && onChange(event)
  }

  const handleKeyUp = (event): void => {
    if (disabled) return
    setActiveLine(event.target.value.substr(0, event.target.selectionStart).split('\n').length)
  }

  // TODO: Add colors to the programming language
  return (
    <div className="grid grid-cols-12 block w-full h-full bg-gray-700 border border-gray-600 text-sm rounded-lg p-2.5 outline-none placeholder:text-gray-300 overflow-y-scroll no-scrollbar">
      <div className="col-end-1 grid auto-rows-min px-1.5 py-1.5" ref={lineCounterRef}>
        {linesArr.map((line) => (
          <div className={` ${line === activeLine ? 'text-white' : 'text-gray-300'}`} key={line}>
            {line}
          </div>
        ))}
      </div>
      <textarea
        ref={textAreaRef}
        rows={numOfLines}
        className="col-start-1 col-end-13 bg-gray-700 text-gray-100 rounded-lg block w-full px-1.5 py-1.5 outline-none placeholder:text-gray-300 resize-none h-full overflow-y-hidden no-scrollbar"
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaChange}
        onKeyUp={handleKeyUp}
        onClick={handleKeyUp}
        required={required}
        disabled={disabled}
        wrap="off"
      />
    </div>
  )
}

export default StyledTextArea
