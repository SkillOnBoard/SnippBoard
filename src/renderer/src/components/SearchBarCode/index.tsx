interface ISearchBarCode {
  code: string | null
  setShowCode: (value: boolean) => void
}

function SearchBarCode({ code, setShowCode }: ISearchBarCode): JSX.Element {
  return (
    <div className="bg-gray-800">
      <button onClick={() => setShowCode(false)}>Close</button>
      <div>{code}</div>
    </div>
  )
}

export default SearchBarCode
