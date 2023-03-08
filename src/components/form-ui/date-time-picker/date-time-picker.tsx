import * as React from 'react';
import { DatePicker, Space, Form } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import type { Moment } from 'moment';

interface DatePickerProps<Moment> {
  allowClear?: boolean;
  className?: string;
  placeholder?: string;
  status?: 'error' | 'warning';
  showTime?: boolean;
  format?: string | string[];
  picker?: 'date' | 'time' | 'month';
  defaultValue?: moment.Moment;
  value?: moment.Moment;
  rules?: Rule[];
  name?: NamePath;
  label?: string;
  onChange?: (date: Moment | null, dateString: string) => void;
  disabledTime?: (date: Moment) => {
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (
      selectedHour: number,
      selectedMinute: number,
    ) => number[];
  };
}

export const DateTimePicker = (props: DatePickerProps<Moment>) => {
  const { picker = 'date', label, name, rules, ...rest } = props;

  const renderDateTimePicker = () => {
    if (rules) {
      return (
        <Form.Item name={name} rules={rules} label={label}>
          <DatePicker picker={picker} {...rest} />
        </Form.Item>
      );
    }
    return <DatePicker picker={picker} {...rest} />;
  };

  return (
    <Space direction="vertical" size="middle" className="time-picker">
      {renderDateTimePicker()}
    </Space>
  );
};
