import { Rule } from 'antd/lib/form';
import {
  REGEX_EMAIL,
  REGEX_HOST,
  REGEX_NUMER,
  REGEX_PASSWORD,
  REGEX_SPECIAL_CHARACTERS,
} from 'config/constant';
import i18n from 'config/i18n';

export function specialCharactersRule(): Rule {
  return {
    pattern: REGEX_SPECIAL_CHARACTERS,
    message: i18n.t('do_not_contain_special_characters'),
  };
}

export function emailRule(): Rule {
  return {
    pattern: REGEX_EMAIL,
    message: i18n.t('enter_correct_email_format'),
  };
}

export function hostRule(): Rule {
  return {
    pattern: REGEX_HOST,
    message: i18n.t('incorrect_format'),
  };
}

export function numberRule(): Rule {
  return {
    pattern: REGEX_NUMER,
    message: i18n.t('incorrect_format'),
  };
}

export function passwordRule(): Rule {
  return {
    pattern: REGEX_PASSWORD,
    message: i18n.t('password_format'),
  };
}
