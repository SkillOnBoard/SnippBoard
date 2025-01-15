import LabeledInput from '@renderer/components/molecules/LabeledInput'
import TagPicker from '@renderer/components/molecules/TagPicker'
import StyledLabeledTextArea from '@renderer/components/molecules/StyledLabeledTextArea'
import { useTranslation } from 'react-i18next'
import { useListTags } from '@renderer/hooks/useListTags'

export type SnippetFormType = {
  id?: number
  title: string
  content: string
  labels: Label[]
}

type Props = {
  form: SnippetFormType
  setForm: (form: SnippetFormType) => void
  onSubmit: () => void
}

const SnippetForm = ({ form, setForm, onSubmit }: Props): JSX.Element => {
  const { t } = useTranslation()
  const { data: predefinedTags } = useListTags()

  return (
    <div className="p-4">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <LabeledInput
              label={t('create.fields.name.label')}
              placeholder={t('create.fields.name.label')}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autofocus
            />

            <TagPicker
              label={t('create.fields.label.label')}
              placeholder={t('create.fields.label.placeholder')}
              values={form.labels}
              onChange={(values) => setForm({ ...form, labels: values })}
              predefinedTags={predefinedTags}
            />
          </div>

          <StyledLabeledTextArea
            label={t('create.fields.code.label')}
            placeholder={t('create.fields.code.placeholder')}
            value={form.content}
            numOfLines={6}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
      </form>
    </div>
  )
}

export default SnippetForm
