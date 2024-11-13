import React, { useMemo, useRef } from 'react'

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
  // const highlightRef = useRef<HTMLDivElement>(null)
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

  // useEffect(() => {
  //   if (highlightRef.current) {
  //     highlightRef.current.style.top = `${activeLine * 20 - 1}px`
  //   }
  // }, [activeLine])

  // TODO: Add colors to the programming language
  // max-h-40 overflow-y-scroll no-scrollbar
  return (
    <div className="grid grid-cols-12 block w-full h-full bg-gray-700 border border-gray-600 text-sm rounded-lg p-2.5 outline-none placeholder:text-gray-300 overflow-y-scroll no-scrollbar">
      {/*
        // Highlight active line
        <div className="absolute w-full h-full text-color-300">
          <div
            ref={highlightRef}
            className="z-50 absolute w-full min-h-5  border-x-gray-300 bg-gray-300/10"
          />
        </div> */}
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
        className="col-start-1 col-end-13  bg-gray-700 text-sm rounded-lg block w-full px-1.5 py-1.5 outline-none placeholder:text-gray-300 resize-none h-full overflow-y-hidden no-scrollbar"
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
