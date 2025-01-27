import LabeledInput from '@renderer/components/molecules/LabeledInput'
import Snippet from '@renderer/components/forms/Snippet'
import TagPicker from '@renderer/components/molecules/TagPicker'
import StyledLabeledTextArea from '@renderer/components/molecules/StyledLabeledTextArea'
import { useTranslation } from 'react-i18next'
import { useListTags } from '@renderer/hooks/useListTags'

type Props = {
  form: Snippet
  setForm: (form: Snippet) => void
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
              value={form.get('title').value}
              onChange={(e) => {
                setForm(new Snippet({ ...form.getValues(), title: e.target.value }))
              }}
              error={form.get('title').error}
              autofocus
            />

            <TagPicker
              label={t('create.fields.label.label')}
              placeholder={t('create.fields.label.placeholder')}
              values={form.get('labels').value}
              onChange={(values) => {
                setForm(new Snippet({ ...form.getValues(), labels: values }))
              }}
              error={form.get('labels').error}
              predefinedTags={predefinedTags}
            />
          </div>

          <StyledLabeledTextArea
            label={t('create.fields.code.label')}
            placeholder={t('create.fields.code.placeholder')}
            numOfLines={6}
            value={form.get('content').value}
            onChange={(e) => {
              setForm(new Snippet({ ...form.getValues(), content: e.target.value }))
            }}
            error={form.get('content').error}
          />
        </div>
      </form>
    </div>
  )
}

export default SnippetForm
