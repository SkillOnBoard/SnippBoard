interface ISearchBarRow {
  index: number
  title: string
  labels: string[]
  selectedIndex: number
  showCode: boolean
  setShowCode: (value: boolean) => void
  setSelectedIndex: (value: number) => void
}

function SearchBarRow({
  index,
  title,
  labels,
  selectedIndex,
  showCode,
  setShowCode,
  setSelectedIndex
}: ISearchBarRow): JSX.Element {
  return (
    <div
      key={index}
      className={`flex justify-between items-center cursor-pointer mx-4 px-4 py-2 rounded-lg ${selectedIndex == index ? 'bg-gray-800' : ''}`}
      onClick={() => setShowCode(true)}
      onMouseOver={() => setSelectedIndex(index)}
    >
      <div className={`flex items-center space-x-2`}>
        <span>{title}</span>
      </div>

      {!showCode && <div className=" flex flex-row">
        {labels.map((result, index) => {
          return (
            <div key={index} className=" ml-2 text-blue-400 text-sm">
              {result}
            </div>
          )
        })}
        <div className="ml-2 text-blue-400 text-sm">
          otro
        </div>
      </div>}
    </div>
  )
}

export default SearchBarRow
