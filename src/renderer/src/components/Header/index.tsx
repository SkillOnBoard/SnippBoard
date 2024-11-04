import { useNavigate } from 'react-router-dom'
import Icon from '@renderer/components/atoms/Icon'

const Header = ({ header }: { header: string }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="left-0 w-full draggable">
      <div className="flex flex-row gap-2 items-center p-3" onClick={() => navigate('/')}>
        <div
          className="no-draggable p-0.5 rounded-lg cursor-pointer border bg-gray-800 border-gray-800 hover:bg-gray-700 active:bg-gray-900 active:border active:border-accent"
          onClick={() => navigate('/')}
        >
          <Icon name="arrow-left" />
        </div>

        <span className="text-gray-200 dark:text-gray-400">{header}</span>
      </div>
      <hr className="border-gray-700" />
    </div>
  )
}

export default Header
