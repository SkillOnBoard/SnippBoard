import Button from '@renderer/components/atoms/Button'
import Text from '@renderer/components/atoms/Text'
import { useTranslation } from 'react-i18next'

type Props = {
  onClose: () => void
  onDelete: () => void
}

const DeleteModal = ({ onClose, onDelete }: Props): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div
      id="popup-modal"
      className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full bg-gray-800 shadow rounded-lg border border-gray-600">
        <Button onClick={onClose}>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </Button>
        <div className="grid p-4 md:p-5 text-center gap-2">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <Text.Header3 color="text-gray-200">{t('delete.modal.content')}</Text.Header3>
          <div className="flex flex-row justify-center items-center ">
            <Button onClick={onDelete}> {t('delete.modal.confirm')}</Button>
            <Button onClick={onClose}>{t('delete.modal.cancel')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
