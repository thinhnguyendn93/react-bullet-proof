import * as React from 'react';
import { TimePicker as TimePickerAnt, Form } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import classNames from 'classnames';
import { FontIcon } from 'components/font-icon';
import type { Moment } from 'moment';

interface TimePickerProps<Moment> {
  size?: 'middle' | 'large';
  allowClear?: boolean;
  className?: string;
  status?: 'error' | 'warning';
  showTime?: boolean;
  placeholder?: string | [string, string];
  format?: string | string[];
  defaultValue?: Moment | [Moment, Moment];
  value?: Moment | Moment[];
  rules?: Rule[];
  name?: NamePath;
  label?: string;
  disabled?: boolean;
  range?: boolean;
  suffixIcon?: React.ReactNode;
  onChange?: (
    time: Moment | [Moment, Moment] | null,
    dateString?: string,
  ) => void;
}

export const TimePicker = (props: TimePickerProps<Moment>) => {
  const {
    rules,
    name,
    label,
    range,
    size,
    value,
    placeholder,
    defaultValue,
    onChange,
    ...rest
  } = props;
  const timeRangeClasses = classNames('ant-picker-range__wrapper', {
    [`ant-picker-range--${size}`]: range && size,
  });

  const clearIcon = <FontIcon name="danger-circle" size={16} />;

  const onTimeRangeChange = (time: [Moment, Moment]) => {
    onChange && onChange(time);
  };

  const renderTimePicker = () => {
    if (range) {
      return (
        <TimePickerAnt.RangePicker
          {...rest}
          placeholder={placeholder as [string, string]}
          value={value as [Moment, Moment]}
          defaultValue={defaultValue as [Moment, Moment]}
          className={timeRangeClasses}
          clearIcon={clearIcon}
          onChange={onTimeRangeChange}
        />
      );
    }
    return (
      <TimePickerAnt
        {...rest}
        placeholder={placeholder as string}
        value={value as Moment}
        defaultValue={defaultValue as Moment}
        clearIcon={clearIcon}
        onChange={onChange}
      />
    );
  };

  const renderContent = () => {
    if (rules) {
      return (
        <Form.Item name={name} rules={rules} label={label}>
          {renderTimePicker()}
        </Form.Item>
      );
    }
    return renderTimePicker();
  };

  return <div className="time-picker">{renderContent()}</div>;
};
