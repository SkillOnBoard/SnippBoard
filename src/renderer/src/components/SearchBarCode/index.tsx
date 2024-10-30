import Tag from '@renderer/components/atoms/Tag'

interface Props {
  labels: string[]
  code: string | null
}

const SearchBarCode = ({ labels, code }: Props): JSX.Element => {
  return (
    <div className="bg-gray-900 w-full px-4 py-2">
      <div>
        <div className="flex flex-row gap-2 items-center">
          {labels.map((label, index) => {
            return (
              <Tag key={index} defaultColor="blue">
                {label}
              </Tag>
            )
          })}
        </div>
      </div>
      <div className="w-full h-[250px] mt-2 bg-gray-700 text-white border border-gray-600 p-2 rounded-lg">
        {code}
      </div>
    </div>
  )
}

export default SearchBarCode
