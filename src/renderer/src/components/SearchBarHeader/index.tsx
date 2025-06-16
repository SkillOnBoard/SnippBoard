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
      <div className="flex flex-row gap-2 items-center p-4 bg-red-500">
        <Icon name="search" />
        <input
          type="text"
          autoFocus
          className="no-draggable text-white outline-none w-6/12 bg-inherit placeholder-gray-200"
          placeholder={t('search_bar.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={(e) => e.target.focus()} // Keep always focus on input
        />
      </div>
    </div>
  )
}

export default SearchBarHeader
