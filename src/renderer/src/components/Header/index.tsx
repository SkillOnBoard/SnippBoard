import { useNavigate } from 'react-router-dom'

const Header = ({ tempText }: { tempText: string }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="left-0 w-full">
      <div className="flex flex-row gap-2 items-center p-4" onClick={() => navigate('/')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="stroke-2 size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <span className="text-gray-600 dark:text-gray-400">{tempText}</span>
      </div>
      <hr className="border-gray-600" />
    </div>
  )
}

export default Header
