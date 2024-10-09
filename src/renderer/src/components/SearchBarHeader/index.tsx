import { useTranslation } from 'react-i18next'
import Icon from '../atoms/Icon'

interface ISearchBarHeader {
  query: string
  setQuery: (value: string) => void
}

function SearchBarHeader({ query, setQuery }: ISearchBarHeader): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="left-0 w-full">
      <div className="flex flex-row gap-2 items-center p-4">
        <Icon name="magnifying-glass" size="large" />
        <input
          type="text"
          className="text-gray-600 dark:text-gray-400 outline-none bg-inherit placeholder-gray-500"
          placeholder={t('search_bar.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <hr className="border-gray-600" />
    </div>
  )
}

export default SearchBarHeader
