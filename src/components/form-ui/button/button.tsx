import { Button as AntButton } from 'antd';
import classNames from 'classnames';
import { FontIcon } from 'components/font-icon';

interface Props {
  type?: 'primary' | 'default' | 'link' | 'text' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  variant?: 'info' | 'danger' | 'success';
  disabled?: boolean;
  rounded?: boolean;
  label?: string;
  loading?: boolean;
  icon?: string;
  suffixIcon?: string;
  iconSize?: number;
  className?: string;
  outlined?: boolean;
  buttonType?: 'button' | 'submit';
  onlyIcon?: boolean;
  onClick?: () => void;
}

export function Button(props: Props) {
  const {
    className,
    iconSize,
    icon,
    suffixIcon,
    loading,
    type,
    label,
    disabled,
    size = 'small',
    variant,
    rounded,
    outlined,
    buttonType,
    onlyIcon,
    onClick,
  } = props;
  const classes = classNames(className, {
    [`ant-btn--${size}`]: size,
    [`ant-btn--${variant}`]: variant,
    [`ant-btn--circle`]: rounded,
    [`ant-btn--outline`]: outlined,
    [`ant-btn--empty-prefix-icon`]: !icon,
  });

  const renderContent = () => {
    if (onlyIcon) {
      return null;
    }
    if (label || suffixIcon) {
      return (
        <div className="ant-btn__content">
          <span>{label}</span>
          {suffixIcon && <FontIcon name={suffixIcon} size={iconSize || 16} />}
        </div>
      );
    }
    return null;
  };

  return (
    <AntButton
      className={classes}
      type={type}
      loading={loading}
      onClick={onClick}
      icon={icon && <FontIcon name={icon} size={iconSize || 16} />}
      disabled={disabled}
      htmlType={buttonType}
      ghost={outlined}
    >
      {renderContent()}
    </AntButton>
  );
}
