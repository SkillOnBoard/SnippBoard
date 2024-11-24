import Tag from '@renderer/components/atoms/Tag'
import StyledTextArea from '../atoms/StyledTextArea'

interface Props {
  labels: Label[]
  code: string
}

const SearchBarCode = ({ labels, code }: Props): JSX.Element => {
  console.log(labels)
  console.log(code)
  return (
    <div className="flex flex-col gap-4 bg-gray-900 w-full h-full p-4">
      {!!labels.length && (
        <div className="row-span-full	flex flex-row  gap-2 items-center">
          {labels.map((label, index) => {
            return (
              <Tag key={index} defaultColor="blue">
                {label.title}
              </Tag>
            )
          })}
        </div>
      )}
      <div className="max-h-56">
        <StyledTextArea value={code} numOfLines={1} disabled />
      </div>
    </div>
  )
}

export default SearchBarCode
