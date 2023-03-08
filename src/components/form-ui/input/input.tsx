import { Form, Input as AntInput } from 'antd';
import { ChangeEvent } from 'react';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';

interface Props {
  name?: NamePath;
  label?: string;
  className?: string;
  placeholder?: string;
  textArea?: boolean;
  password?: boolean;
  value?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  status?: 'error' | 'warning';
  rules?: Rule[];
  allowClear?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  type?: string;
  min?: number;
  max?: number;
  size?: 'large' | 'middle' | 'small';
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
}

export function Input(props: Props) {
  const {
    type,
    name,
    label,
    className,
    placeholder,
    value,
    defaultValue,
    status,
    rules,
    disabled,
    textArea,
    password,
    rows,
    autoFocus,
    maxLength,
    min = 1,
    max = 255,
    size,
    onChange,
    onPressEnter,
  } = props;

  const inputProps = {
    placeholder,
    className,
    disabled,
    maxLength,
    autoFocus,
    type,
    min,
    max,
    size,
    onChange: (event: ChangeEvent) =>
      onChange && onChange((event.target as HTMLInputElement).value),
  };

  const renderInput = () => {
    if (rules) {
      return (
        <Form.Item label={label} name={name} rules={rules}>
          <AntInput {...inputProps} />
        </Form.Item>
      );
    }

    return (
      <AntInput
        {...inputProps}
        status={status}
        value={value}
        defaultValue={defaultValue}
        onPressEnter={onPressEnter}
        allowClear
      />
    );
  };

  const renderInputArea = () => {
    if (rules) {
      return (
        <Form.Item label={label} name={name} rules={rules}>
          <AntInput.TextArea {...inputProps} rows={rows} allowClear />
        </Form.Item>
      );
    }

    return (
      <AntInput.TextArea
        {...inputProps}
        status={status}
        value={value}
        rows={rows}
        onPressEnter={onPressEnter}
      />
    );
  };

  const renderInputPassword = () => {
    if (rules) {
      return (
        <Form.Item label={label} name={name} rules={rules}>
          <AntInput.Password {...inputProps} />
        </Form.Item>
      );
    }

    return (
      <AntInput.Password
        {...inputProps}
        status={status}
        value={value}
        onPressEnter={onPressEnter}
      />
    );
  };

  if (textArea) {
    return renderInputArea();
  }
  if (password) {
    return renderInputPassword();
  }
  return renderInput();
}
