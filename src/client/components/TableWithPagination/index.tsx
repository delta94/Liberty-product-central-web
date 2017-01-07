import * as React from 'react';
import { SpinProps } from 'antd/lib/spin';
import { Table, Icon } from 'antd';
import '../LoadingSpinner/LoadingSpinner.scss';
const antIcon = <Icon type="reload" spin />;

export interface TableProps {
  defaultPageSize?: number;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  showQuickJumper?: boolean;
  size?: string;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  spinConfig?: SpinProps;
  showTotal?: React.ReactNode;
  collection?: string;
  position?: 'top' | 'bottom' | 'both' | undefined;

  loading: boolean;
  page: number;
  pageSize: number;
  totalRows: number;
  rowKey: string;
  columns: any[];
  dataSource: any;

  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

const TableWithPagination: React.SFC<TableProps> = props => {
  const spinDelay = 500;
  const spinnerProps = {
    spinning: props.loading,
    delay: spinDelay,
    indicator: antIcon,
    tip: `Loading${props.collection ? ` ${props.collection}` : ''}...`,
    ...props.spinConfig,
  };
  return (
    <Table
      size="middle"
      bordered
      className={props.className}
      loading={spinnerProps}
      columns={props.columns}
      dataSource={props.dataSource}
      rowKey={props.rowKey}
      pagination={{
        current: props.page,
        position: props.position ? props.position : 'bottom',
        pageSize: props.pageSize ? props.pageSize : 15,
        total: props.totalRows,
        className: 'ant-pagination ant-table-pagination',
        hideOnSinglePage: true,
        showSizeChanger: props.showSizeChanger ? props.showSizeChanger : true,
        showQuickJumper: props.showQuickJumper ? props.showQuickJumper : true,
        pageSizeOptions: props.pageSizeOptions ? props.pageSizeOptions : ['15', '25', '50'],
        showTotal: (total, range) => (props.showTotal ? props.showTotal : `${range[0]}-${range[1]} of ${total}${props.collection ? ` ${props.collection}` : ''}`),
        onShowSizeChange: (current: number, size: number) => {
          if (props.onShowSizeChange) props.onShowSizeChange(current, size);
        },
        onChange: (page: number, pageSize?: number) => {
          if (props.onChange) props.onChange(page, pageSize);
        },
      }}
    />
  );
};

export default TableWithPagination;
