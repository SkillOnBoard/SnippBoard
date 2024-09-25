import { useNavigate } from 'react-router-dom'
import Icon from '@renderer/components/atoms/Icon'

const Header = ({ tempText }: { tempText: string }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="left-0 w-full">
      <div className="flex flex-row gap-2 items-center p-4" onClick={() => navigate('/')}>
        <Icon name="arrow-left" size="large" />

        <span className="text-gray-600 dark:text-gray-400">{tempText}</span>
      </div>
      <hr className="border-gray-600" />
    </div>
  )
}

export default Header
