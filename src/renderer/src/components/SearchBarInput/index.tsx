import { useTranslation } from 'react-i18next'

interface ISearchBarInput {
  query: string
  setQuery: (value: string) => void
}

function SearchBarInput({ query, setQuery }: ISearchBarInput): JSX.Element {
  const { t } = useTranslation()
  return (
    <input
      type="text"
      className="w-full px-4 py-2 text-xl outline-none bg-inherit placeholder-gray-500"
      placeholder={t('search_bar.placeholder')}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

export default SearchBarInput
