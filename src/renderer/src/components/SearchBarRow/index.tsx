interface ISearchBarRow {
  index: number
  resultName: string
  resultType: string
  selectedIndex: number
  setShowCode: (value: boolean) => void
  setSelectedIndex: (value: number) => void
}

function SearchBarRow({
  index,
  resultName,
  resultType,
  selectedIndex,
  setShowCode,
  setSelectedIndex
}: ISearchBarRow): JSX.Element {
  return (
    <div
      key={index}
      className={`flex justify-between items-center px-4 py-2 cursor-pointer ${selectedIndex == index ? 'bg-gray-700' : ''}`}
      onClick={() => setShowCode(true)}
      onMouseOver={() => setSelectedIndex(index)}
    >
      <div className="flex items-center space-x-2">
        <span>{resultName}</span>
      </div>
      <span className="text-blue-400 text-sm">{resultType}</span>
    </div>
  )
}

export default SearchBarRow
