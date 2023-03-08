/* eslint-disable no-control-regex, max-lines */
import langEn from 'i18n/en.json';
import RESOURCES from './resources';

export { langEn, RESOURCES };

export const DEFAULT_LANGUAGE = 'en';
export const VI_LANGUAGE = 'vi';
export const SHORT_DATE_FORMAT = 'MM/DD/YYYY';
export const DAY_MONTH_YEAR_FORMAT = 'DD/MM/YYYY';

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_TIME_DISPLAY_FORMAT = 'hh:mm A - MM/DD/YYYY';
export const TIME_FORMAT = 'HH:mm';

export const COOKIE_EXPIRES_DATE = 7;
export const COOKIE_DOMAIN = '';

export const REGEX_SPECIAL_CHARACTERS = new RegExp('^[^.!@#$%^&*()<>,+=;/|]+$');
export const REGEX_EMAIL = new RegExp(/\S+@\S+\.\S+/);
export const REGEX_HOST = new RegExp(
  '^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$',
);
export const REGEX_NUMER = new RegExp(/[^0-9]/gi);
export const REGEX_PASSWORD = new RegExp(`^(?=.*[A-Z])(?=.*[0-9])`);

export const CAROUSEL_PLAY_SPEED = 4000;
export const DEBOUNCE_SEARCH = 500;
export const MINIMUM_SIZE_PANE = 320;
