import Tag from '../atoms/Tag'

interface Props {
  labels: string[]
  code: string | null
}

const SearchBarCode = ({ labels, code }: Props): JSX.Element => {
  return (
    <div className="bg-gray-800 w-full px-4 py-2">
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
      <div className="w-full h-[250px] mt-2 bg-black p-2 rounded-lg">
        <textarea
          className="bg-black h-full text-sm block w-full outline-none p-2 resize-none"
          value={code || ''}
          disabled
        />
      </div>
    </div>
  )
}

export default SearchBarCode
