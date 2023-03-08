import { useTranslation } from 'react-i18next';
import { ModalLayout } from 'components/modal';
import { ContactForm } from 'components/contact-form';

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

export function ContactModal(props: Props) {
  const { t } = useTranslation();
  const { visible, onClose } = props;

  const onSubmit = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        onClose();
      }, 1000);
    });
  };

  return (
    <ModalLayout title={t('contact_us')} visible={visible} onClose={onClose}>
      <ContactForm onSubmit={onSubmit} />
    </ModalLayout>
  );
}
