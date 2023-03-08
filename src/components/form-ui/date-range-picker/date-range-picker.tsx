import * as React from 'react';
import { isNull } from 'lodash';
import { DatePicker, Form } from 'antd';
import classNames from 'classnames';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { FontIcon } from 'components/font-icon';
import type { Moment } from 'moment';

const { RangePicker } = DatePicker;

interface RangePickerProps<Moment> {
  name?: NamePath;
  rules?: Rule[];
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  allowClear?: boolean;
  className?: string;
  status?: 'error' | 'warning';
  showTime?: boolean;
  disabled?: boolean | [boolean, boolean];
  format?: string | string[];
  placeholder?: [string, string];
  defaultValue?: [Moment, Moment];
  value?: [Moment, Moment];
  ranges?:
    | { [range: string]: [Moment, Moment] }
    | { [range: string]: () => [Moment, Moment] };
  onChange?: (dates: [Moment, Moment] | null) => void;
  onCalendarChange?: (
    dates: [Moment, Moment] | null,
    dateStrings: [string, string],
    info: { range: 'start' | 'end' },
  ) => void;
  disabledTime?: (
    date: Moment,
    partial: 'start' | 'end',
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (
      selectedHour: number,
      selectedMinute: number,
    ) => number[];
  };
}

export const DateRangePicker = (props: RangePickerProps<Moment>) => {
  const {
    size = 'large',
    name,
    rules,
    onChange: onChangeProp,
    ...rest
  } = props;
  const classes = classNames('ant-picker-range__wrapper', {
    [`ant-picker-range--${size}`]: true,
  });
  const rangePickerProps = {
    ...rest,
    suffixIcon: (
      <FontIcon name="calendar-month" size={16} color="tundora-100" />
    ),
  };

  const onChange = (dates: [Moment, Moment] | null) => {
    let newDates: [Moment, Moment];
    if (isNull(dates)) {
      newDates = [null, null];
    } else {
      newDates = [dates[0].startOf('day'), dates[1].endOf('day')];
    }
    onChangeProp && onChangeProp(newDates);
  };

  const renderDateRangePicker = () => {
    if (rules) {
      return (
        <Form.Item name={name} rules={rules}>
          <RangePicker {...rangePickerProps} />
        </Form.Item>
      );
    }
    return <RangePicker {...rangePickerProps} onChange={onChange} />;
  };

  return <div className={classes}>{renderDateRangePicker()}</div>;
};
