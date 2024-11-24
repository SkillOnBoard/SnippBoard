import Tag from '../atoms/Tag'

interface Props {
  index: number
  title: string
  labels: string[]
  selectedIndex: number
  showCode: boolean
  setShowCode: (value: boolean) => void
  setSelectedIndex: (value: number) => void
}

const SearchBarRow = ({
  index,
  title,
  labels,
  selectedIndex,
  showCode,
  setShowCode,
  setSelectedIndex
}: Props): JSX.Element => {
  return (
    <div
      key={index}
      className={`flex justify-between items-center cursor-pointer mx-4 px-4 py-2 rounded-lg ${selectedIndex == index ? 'bg-gray-700' : ''}`}
      onClick={() => {if (selectedIndex >= 0) setShowCode(!showCode)}}
      onMouseOver={() => setSelectedIndex(index)}
    >
      <div className={`flex text-white teitems-center space-x-2 my-1`}>
        <span>{title}</span>
      </div>

      {!showCode && (
        <div className=" flex flex-row">
          {labels.map((result, index) => {
            return (
              <div key={index} className="ml-2">
                <Tag defaultColor="blue">{result}</Tag>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBarRow
