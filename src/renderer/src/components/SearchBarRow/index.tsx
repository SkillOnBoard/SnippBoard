interface ISearchBarRow {
  index: number
  title: string
  labels: string[]
  selectedIndex: number
  setShowCode: (value: boolean) => void
  setSelectedIndex: (value: number) => void
}

function SearchBarRow({
  index,
  title,
  labels,
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
        <span>{title}</span>
      </div>
      <span className="text-blue-400 text-sm">{labels[0]}</span>
    </div>
  )
}

export default SearchBarRow
