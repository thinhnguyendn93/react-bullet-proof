import moment, { Moment } from 'moment';
import { isEqual } from 'lodash';
import {
  DATE_TIME_DISPLAY_FORMAT,
  DEFAULT_DATE_FORMAT,
  TIME_FORMAT,
} from 'config/constant';
import i18n from 'config/i18n';

export function formatToDisplayDate(
  date: string,
  format: string = DEFAULT_DATE_FORMAT,
): string {
  return moment(date, format).format(DATE_TIME_DISPLAY_FORMAT);
}

export function formatDate(
  date: Date | Moment | string,
  format: string = DEFAULT_DATE_FORMAT,
): string {
  return moment(date).format(format);
}

export function formatDuration(seconds: number = 0) {
  const number = 1000;
  const dateString = new Date(seconds * number).toISOString();
  return dateString.substring(11, 19);
}

export function secondsToMoment(second: number) {
  return moment().startOf('date').set({ second });
}

export function getSeconds(time: Moment) {
  return time.diff(moment().startOf('date'), 'seconds');
}

export function getMonthYearMoment(month: number, year: number) {
  return moment().set({ months: month - 1, years: year });
}

export function getMonthYear(date: Moment) {
  return {
    month: date.month() + 1,
    year: date.year(),
  };
}

export function getDaysOfWeek(days: string[]) {
  const weekend = ['sat', 'sun'];
  const weekdays = ['fri', 'mon', 'thu', 'tue', 'wed'];
  const everyday = weekdays.concat(weekend).sort();
  const newDays = days.slice().sort();

  if (isEqual(newDays, weekend)) {
    return i18n.t('weekend');
  }

  if (isEqual(newDays, weekdays)) {
    return i18n.t('weekdays');
  }

  if (isEqual(newDays, everyday)) {
    return i18n.t('everyday');
  }

  return i18n.t('every_weekdays', {
    text: days.map((day) => i18n.t(day)).join(', '),
  });
}

export function timeToMoment(
  time: Date | Moment | string,
  durationInMinutes: number = 0,
) {
  return moment(time || '0', TIME_FORMAT).add(durationInMinutes, 'minutes');
}

export function momentToTime(date: Date | Moment | string) {
  return formatDate(date, TIME_FORMAT);
}

export function toMoment(date: Date | string) {
  return moment(date);
}

export function compareTime(
  startTime: Date | Moment | string,
  endTime: Date | Moment | string,
) {
  const start = timeToMoment(startTime);
  const end = timeToMoment(endTime);
  return start.isBefore(end) ? 1 : start.isAfter(end) ? -1 : 0;
}