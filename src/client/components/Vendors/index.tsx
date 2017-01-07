import * as React from 'react';
import { Button, Dropdown, Menu, Icon } from 'antd';
import shortid from 'shortid';
import { withRouter, RouteChildrenProps } from 'react-router';
import { GET_VENDORS } from './Vendor.queries';
import TableWithPagination from '../TableWithPagination';
import { Query } from 'react-apollo';

const vendors = [
  {
    id: shortid.generate(),
    firstName: 'Test',
    lastName: 'Vendor',
    email: 'test@test.com',
    roles: ['Administrator'],
  },
  {
    id: shortid.generate(),
    firstName: 'A',
    lastName: 'Vendor',
    email: 'user@vendor.com',
    roles: ['Vendor', 'Vendor'],
  },
];

interface IBasicVendor {
  Id: number;
  FullName: string;
  Email: string;
  Active: boolean;
  Role: string;
}

interface GetVendorsQueryResponse {
  vendors: {
    vendors: IBasicVendor[];
    totalRows: number;
  };
}

interface GetVendorQueryVariables {
  skip: number;
  pageSize: number;
  searchText: string;
}

export interface VendorsProps {}

const Vendors = function(props: VendorsProps & RouteChildrenProps<any>) {
  const [state, setState] = React.useState({ vendors: vendors, showForm: false });
  const [tableVars, setTableVars] = React.useState({ page: 1, pageSize: 15, skip: 0, searchText: '' });

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: '133px',
      render: (id: number, row: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="1" onClick={() => props.history.push(`/corporate/vendors/edit/${id}`, { id })}>
              <Icon type="user" />
              Edit
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setState({ ...state, showForm: true })}>
              <Icon type="user" />
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu}>
            <Button size="small" style={{ marginLeft: 8 }}>
              Actions <Icon type="down" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          style={{ marginBottom: 20 }}
          onClick={() => {
            props.history.push('/corporate/vendors/add');
            // setState({ ...state, showForm: true });
          }}
        >
          Add Vendor
        </Button>
      </div>
      {!state.showForm && (
        <Query<GetVendorsQueryResponse, GetVendorQueryVariables>
          query={GET_VENDORS}
          variables={{ skip: tableVars.skip, pageSize: tableVars.pageSize, searchText: tableVars.searchText }}
          fetchPolicy="network-only"
        >
          {({ loading, data, error }) => {
            if (error) return <h1>ERROR</h1>;

            const onShowSizeChange = (current: number, pageSize: number) => {
              setTableVars({ ...tableVars, pageSize });
            };

            const onChange = (page: number, pageSize?: number) => {
              pageSize = pageSize ? pageSize : 15;
              setTableVars({ ...tableVars, pageSize, skip: (page - 1) * pageSize, page });
            };

            return (
              <TableWithPagination
                loading={loading}
                page={tableVars.page}
                pageSize={tableVars.pageSize}
                totalRows={data && data.vendors ? data.vendors.totalRows : 0}
                columns={userColumns}
                dataSource={data && data.vendors ? data.vendors.vendors : []}
                rowKey="id"
                collection="Vendors"
                onChange={onChange}
                onShowSizeChange={onShowSizeChange}
              />
            );
          }}
        </Query>

        //         <Query<GetVendorsQueryResponse, GetVendorsQueryVariables> query={GET_USERS} variable={{skip, pageSize}}>
        // {data, { LoadingSpinner, }}
        //           <Table dataSource={state.vendors} columns={userColumns} bordered showHeader={true} size="default" />
        //         </Query>
      )}
    </div>
  );
};

export default withRouter(Vendors);
