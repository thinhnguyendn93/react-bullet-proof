import { ConfigProvider, Skeleton, Table as AntTable, TableProps } from 'antd';
import { ColumnsType, SorterResult } from 'antd/lib/table/interface';
import type {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  data: App.Data[];
  columns: ColumnsType<App.Data>;
  paginate?: App.TablePaginate;
  isLoading?: boolean;
  selectMode?: boolean;
  rowKey?: string;
  selectedItems?: string[];
  renderEmpty?: () => React.ReactNode;
  onSelect?: (selected: string[]) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sortField: string, sortOrder: string) => void;
}

export function Table(props: Props) {
  const { t } = useTranslation();
  const {
    data,
    columns,
    paginate,
    isLoading,
    selectMode,
    rowKey = 'id',
    renderEmpty,
    onPageChange,
    onSortChange,
    onSelect,
    selectedItems,
  } = props;

  const [selectedState, setSelectedState] = useState<{
    [key: string]: boolean;
  }>({});

  const selectedRowKeys = (state: { [key: string]: boolean }): string[] => {
    const keys = Object.keys(state);
    return keys.map((key) => (state[key] ? key : '')).filter((value) => value);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    data.forEach((x) => (selectedState[x.id] = false));
    newSelectedRowKeys.forEach((x) => (selectedState[x] = true));
    setSelectedState({ ...selectedState });
    onSelect && onSelect(selectedRowKeys(selectedState));
  };

  const rowSelection: TableRowSelection<App.Data> = {
    selectedRowKeys: selectedRowKeys(selectedState),
    onChange: onSelectChange,
  };

  const handleChange: TableProps<App.Data>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    const { field, order } = sorter as SorterResult<any>;
    if (field && order) {
      onSortChange && onSortChange(field.toString(), order);
    }
  };

  useEffect(() => {
    if (selectedItems) {
      const newSelected: { [key: string]: boolean } = {};
      selectedItems.forEach((selected) => (newSelected[selected] = true));
      setSelectedState(newSelected);
    }
  }, [selectedItems]);

  const renderLoading = () => {
    const size = paginate?.pageSize || 20;
    const loadingRows = new Array(size).fill(0).map((_, i) => i);

    return (
      <tbody className="ant-table__loading">
        {loadingRows.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {selectMode && (
              <td>
                <Skeleton.Button
                  active
                  style={{ width: 10 }}
                  shape="square"
                  size="small"
                />
              </td>
            )}
            {columns.map((column) => (
              <td key={`${column.key}${rowIndex}`}>
                <Skeleton.Button
                  active
                  shape={column.width ? 'square' : 'default'}
                  size="small"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const isEmpty = !paginate?.total;

  const classes = classNames('ant-table__wrapper', {
    'ant-table--empty': isEmpty,
  });

  const pagination: TablePaginationConfig = useMemo(() => {
    if (!paginate) {
      return null;
    }
    
    return {
      ...paginate,
      position: ['bottomRight'],
      pageSizeOptions: [10, 20, 50],
      defaultPageSize: 20,
      showSizeChanger: true,
      disabled: isLoading,
      responsive: true,
      showTotal: (total: number, range: [number, number]) =>
        t('paginate_info', {
          from: range[0],
          to: range[1],
          total,
        }),
      onChange: onPageChange,
      onShowSizeChange: onPageChange,
    };
  }, [isLoading, paginate]);

  return (
    <div className={classes}>
      <ConfigProvider renderEmpty={renderEmpty}>
        <AntTable
          size="small"
          rowKey={rowKey}
          showSorterTooltip={false}
          rowSelection={selectMode ? rowSelection : null}
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          scroll={{
            y: 500,
            x: true,
          }}
          components={{
            body: {
              wrapper: isLoading ? renderLoading : null,
            },
          }}
          pagination={pagination}
        />
      </ConfigProvider>
    </div>
  );
}
