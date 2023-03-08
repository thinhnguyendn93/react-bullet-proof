import { Rule } from 'antd/lib/form';
import i18n from 'config/i18n';

export function emailRule(): Rule {
  return {
    pattern: new RegExp(/\S+@\S+\.\S+/),
    message: i18n.t('enter_correct_email_format'),
  };
}
