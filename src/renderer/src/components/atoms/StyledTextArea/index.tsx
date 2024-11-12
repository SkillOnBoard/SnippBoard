import React, { useMemo, useRef } from 'react'

type Props = {
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
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
}: Props) => {
  const lineCount = useMemo(() => value.split('\n').length, [value])
  const [activeLine, setActiveLine] = React.useState(1)
  const linesArr = useMemo(
    () => Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  )

  const lineCounterRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    // Consider keydown???
    setActiveLine(event.target.value.substr(0, event.target.selectionStart).split('\n').length)
    onChange(event)
  }

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  // TODO: Manage overflow-y to define a max-height and add scroll
  // Also, add highlight to the active line
  // and colors to the programming language
  return (
    <div className="grid grid-cols-12 bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none placeholder:text-gray-300 max-h-40 overflow-y-scroll no-scrollbar">
      <div className="col-end-1 grid auto-rows-min	 px-1.5 py-1.5" ref={lineCounterRef}>
        {linesArr.map((line) => (
          <div className={` ${line === activeLine ? 'text-white' : 'text-gray-300'}`} key={line}>
            {line}
          </div>
        ))}
      </div>
      <textarea
        rows={numOfLines}
        className="col-start-1 col-end-13  bg-gray-700 text-sm rounded-lg block w-full px-1.5 py-1.5 outline-none placeholder:text-gray-300 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaChange}
        // onScroll={handleTextareaScroll}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}

export default StyledTextArea
