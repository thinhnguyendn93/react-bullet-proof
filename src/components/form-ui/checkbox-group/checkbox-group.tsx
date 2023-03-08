import { Checkbox, Form } from 'antd';
import { useState } from 'react';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import type {
  CheckboxOptionType,
  CheckboxValueType,
} from 'antd/es/checkbox/Group';

interface Props {
  options?: CheckboxOptionType[];
  name?: NamePath;
  rules?: Rule[];
  className?: string;
  label?: string;
}

export function CheckboxGroup(props: Props) {
  const { options, rules, className, name, label } = props;
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onchange = (list: CheckboxValueType[]) => {
    setCheckedList(list as string[]);
  };

  if (rules) {
    return (
      <Form.Item name={name} rules={rules} label={label} className={className}>
        <Checkbox.Group options={options} />
      </Form.Item>
    );
  }

  return (
    <Checkbox.Group
      className={className}
      options={options}
      value={checkedList}
      onChange={onchange}
    />
  );
}
