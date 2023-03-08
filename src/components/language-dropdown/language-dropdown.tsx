import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, RESOURCES, VI_LANGUAGE } from 'config/constant';
import { Select } from 'components/form-ui/select';

interface Props {
  label?: string;
}

export const LanguageDropdown = (props: Props) => {
  const { t } = useTranslation();
  const { label } = props;
  const LANGUAGE_OPTIONS: App.SelectOption[] = [
    {
      value: DEFAULT_LANGUAGE,
      content: t('english'),
      image: RESOURCES.FLAG_USA,
    },
    {
      value: VI_LANGUAGE,
      content: t('vietnamese'),
      image: RESOURCES.FLAG_VIETNAM,
    },
  ];

  return (
    <Select
      name="language"
      label={label}
      options={LANGUAGE_OPTIONS}
      defaultValue={LANGUAGE_OPTIONS[0].value}
      size="large"
    />
  );
};
