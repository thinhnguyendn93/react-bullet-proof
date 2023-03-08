import { InputNumber as AntInputNumber, Form } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';

interface Props {
  name?: NamePath;
  label?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  rules?: Rule[];
  placeholder?: string;
  size?: SizeType;
  disabled?: boolean;
  onChange?: (value: number | null) => void;
}

export function InputNumber(props: Props) {
  const { name, size = 'middle', label, rules, ...rest } = props;

  const renderInputNumber = () => {
    if (rules) {
      return (
        <Form.Item name={name} label={label} rules={rules}>
          <AntInputNumber size={size} {...rest} />
        </Form.Item>
      );
    }
    return <AntInputNumber size={size} {...rest} />;
  };

  return renderInputNumber();
}
