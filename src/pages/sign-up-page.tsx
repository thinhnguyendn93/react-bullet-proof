import { useTranslation } from 'react-i18next';

export function SignUpPage() {
  const { t } = useTranslation();

  return <h1>{t('sign_up')}</h1>;
}
