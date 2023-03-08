import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import { ColorResult, SwatchesPicker } from 'react-color';
import { Button } from 'components/form-ui/button';

interface Props {
  value?: string;
  label?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker(props: Props) {
  const { value = '#FFCDC3', onChange, label } = props;
  const [activeColor, setActiveColor] = useState(value);
  const colors = [
    ['#FFCDC3', '#96EE85', '#88E7FA', '#E6D0FF'],
    ['#FFB7A9', '#72E06A', '#60D8F3', '#DBBBFE'],
    ['#F8D904', '#89ECBC', '#B5DEFF', '#FEC7F8'],
    ['#E8C600', '#67DEA8', '#96CEFD', '#FBAEF6'],
    ['#BCE92A', '#8CE9E2', '#D3D5FF', '#FFCADD'],
    ['#AAD816', '#65DAD2', '#C1C4FF', '#FFB2CE'],
  ];

  useEffect(() => {
    if (value !== activeColor) {
      setActiveColor(value);
    }
  }, [value]);

  const onChangeColor = (color: ColorResult) => {
    setActiveColor(color.hex);
    onChange && onChange(color.hex);
  };

  const renderColorPicker = () => {
    return (
      <SwatchesPicker
        color={activeColor}
        colors={colors}
        onChangeComplete={onChangeColor}
      />
    );
  };

  return (
    <Popover
      overlayClassName="color-picker__wrapper"
      trigger="click"
      placement="topLeft"
      destroyTooltipOnHide
      content={renderColorPicker()}
    >
      <Button type="text" icon="colorize" iconSize={16} label={label} />
    </Popover>
  );
}
