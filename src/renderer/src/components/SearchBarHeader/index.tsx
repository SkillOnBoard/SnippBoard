import { useTranslation } from 'react-i18next'
import Icon from '../atoms/Icon'

interface Props {
  query: string
  setQuery: (value: string) => void
}

const SearchBarHeader = ({ query, setQuery }: Props): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div className="left-0 w-full draggable">
      <div className="flex flex-row gap-2 items-center p-4">
        <Icon name="magnifying-glass" size="large" />
        <input
          type="text"
          autoFocus
          className="no-draggable text-gray-600 dark:text-gray-400 outline-none w-6/12 bg-inherit placeholder-gray-500"
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
