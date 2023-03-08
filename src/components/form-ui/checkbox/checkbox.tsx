import { Checkbox as AntCheckbox, Form } from 'antd';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';

interface Props {
  name?: NamePath;
  label?: string | React.ReactNode;
  className?: string;
  checked?: boolean;
  rules?: Rule[];
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox(props: Props) {
  const { name, label, className, checked, rules, disabled, onChange } = props;

  if (rules) {
    return (
      <Form.Item name={name} rules={rules} valuePropName="checked">
        <AntCheckbox
          onChange={(event) => onChange && onChange(event.target.checked)}
        >
          {label}
        </AntCheckbox>
      </Form.Item>
    );
  }

  return (
    <AntCheckbox
      className={className}
      checked={checked}
      onChange={(event) => onChange && onChange(event.target.checked)}
      disabled={disabled}
    >
      {label}
    </AntCheckbox>
  );
}
