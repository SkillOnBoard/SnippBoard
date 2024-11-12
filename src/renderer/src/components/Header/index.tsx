import { useNavigate } from 'react-router-dom'
import Icon from '@renderer/components/atoms/Icon'

const Header = ({ tempText }: { tempText: string }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="left-0 w-full draggable">
      <div className="flex flex-row gap-2 items-center p-4" onClick={() => navigate('/')}>
        <div className="no-draggable" onClick={() => navigate('/')}>
          <Icon name="arrow-left" />
        </div>

        <span className="text-gray-200 dark:text-gray-400">{tempText}</span>
      </div>
      <hr className="border-gray-700" />
    </div>
  )
}

export default Header
