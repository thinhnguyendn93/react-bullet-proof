import { cloneElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import {
  Select as AntSelect,
  Form,
  ConfigProvider,
  Skeleton,
  SelectProps,
} from 'antd';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import { debounce } from 'lodash';
import { FontIcon } from 'components/font-icon';
import { DEBOUNCE_SEARCH, RESOURCES } from 'config/constant';
import { Empty } from 'components/empty';

const { Option } = AntSelect;

interface Props {
  className?: string;
  popupClassName?: string;
  name?: NamePath;
  label?: string;
  searchable?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  options?: App.SelectOption[];
  open?: boolean;
  customDropdownRender?: JSX.Element;
  multiple?: boolean;
  rules?: Rule[];
  optionFilterProp?: string;
  value?: string | string[];
  maxTagCount?: number | 'responsive';
  status?: 'error' | 'warning';
  defaultValue?: string | string[];
  loading?: boolean;
  size?: 'extra-small' | 'small' | 'default' | 'large';
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  skeletonRows?: number;
  hideArrow?: boolean;
  filterOption?: boolean;
  itemSkeleton?: JSX.Element;
  onChange?: (value: string | string[]) => void;
  onSearch?: (value: string) => void;
}

export function Select(props: Props) {
  const {
    className,
    name,
    label,
    searchable,
    placeholder,
    style,
    placement,
    size = 'default',
    disabled,
    options,
    customDropdownRender,
    open,
    multiple,
    maxTagCount,
    rules,
    status,
    value,
    defaultValue,
    loading,
    optionFilterProp = 'key',
    hideArrow,
    filterOption,
    itemSkeleton,
    skeletonRows = 3,
    onChange,
    onSearch,
    popupClassName,
  } = props;
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const classes = classNames(className, 'ant-select-container', {
    [`ant-select-container--${size}`]: size,
  });

  const onBlur = () => {
    setSearch('');
  };

  const renderOption = (option: App.SelectOption) => {
    const {
      image,
      icon,
      iconBackground,
      content,
      iconColor,
      iconSize = 16,
    } = option;

    return (
      <div className="ant-option">
        {image && <img className="ant-option__image" src={image} />}
        {icon && (
          <FontIcon
            name={icon}
            size={iconSize}
            background={iconBackground}
            color={iconColor}
          />
        )}
        <div className="ant-option__content-wrapper">{content}</div>
      </div>
    );
  };

  const renderOptions = () => {
    if (options) {
      return options
        .filter((x) => !x.hidden)
        .map((option) => {
          const { value, key, content, divider } = option;
          const optionKey = key || (content as React.Key);
          return (
            <Option key={optionKey} value={value}>
              {divider && (
                <div className="ant-select-item-option-content__divider" />
              )}
              {renderOption(option)}
            </Option>
          );
        });
    }

    return <></>;
  };

  const dropdownRender = (menu: React.ReactElement) => {
    return (
      <>
        {menu}
        {customDropdownRender}
      </>
    );
  };

  const debounceSearch = debounce((value: string): void => {
    if (onSearch) {
      onSearch(value);
      setSearch(value);
    }
  }, DEBOUNCE_SEARCH);

  const renderNotFoundContent = () => {
    if (loading) {
      const rows = [...Array(skeletonRows).keys()];

      return (
        <>
          {rows.map((value) =>
            itemSkeleton ? (
              cloneElement(itemSkeleton, { key: value })
            ) : (
              <Skeleton.Button key={value} active shape="round" size="small" />
            ),
          )}
        </>
      );
    }
    return (
      <Empty
        hasSearch={Boolean(search)}
        description={t('no_option_here')}
        image={RESOURCES.EMPTY}
      />
    );
  };

  const renderSelect = () => {
    let selectProps: SelectProps = {
      className: classes,
      showSearch: searchable,
      placeholder,
      style,
      placement,
      disabled,
      value,
      open,
      status,
      optionFilterProp,
      maxTagCount,
      filterOption,
      loading,
      popupClassName,
      showArrow: !hideArrow,
      notFoundContent: renderNotFoundContent(),
      removeIcon: (
        <FontIcon name="danger-circle" size={16} color="silver-chalice-100" />
      ),
      suffixIcon: !loading && <FontIcon name="chevron-down" size={16} />,
      menuItemSelectedIcon: (
        <FontIcon name="check-light" color="congress-blue" size={16} />
      ),
      onChange,
      dropdownRender,
      onBlur: onBlur,
    };

    if (searchable) {
      selectProps = { ...selectProps, onSearch: debounceSearch };
    }

    if (rules) {
      return (
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          initialValue={defaultValue}
        >
          <AntSelect {...selectProps} mode={multiple ? 'multiple' : undefined}>
            {renderOptions()}
          </AntSelect>
        </Form.Item>
      );
    }

    return (
      <>
        {label && <p className="ant-select__label">{label}</p>}
        <AntSelect
          {...selectProps}
          mode={multiple ? 'multiple' : undefined}
          defaultValue={defaultValue}
        >
          {renderOptions()}
        </AntSelect>
      </>
    );
  };

  return (
    <div className="ant-select__wrapper">
      <ConfigProvider renderEmpty={() => <Empty />}>
        {renderSelect()}
      </ConfigProvider>
    </div>
  );
}
