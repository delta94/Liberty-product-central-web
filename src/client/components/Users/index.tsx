import * as React from 'react';
import { Button, Tag, Dropdown, Menu, Icon } from 'antd';
import shortid from 'shortid';
import { withRouter, RouteChildrenProps } from 'react-router';
import { GET_USERS } from './User.queries';
import TableWithPagination from '../TableWithPagination';
import { Query } from 'react-apollo';
import { IVendor } from 'client/interfaces/vendor';

const users = [
  {
    id: shortid.generate(),
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    roles: ['Administrator'],
  },
  {
    id: shortid.generate(),
    firstName: 'A',
    lastName: 'Vendor',
    email: 'user@vendor.com',
    roles: ['Vendor', 'User'],
  },
];

interface IBasicUser {
  Id: number;
  FullName: string;
  Email: string;
  Active: boolean;
  Role: string;
}

interface GetUsersQueryResponse {
  users: {
    users: IBasicUser[];
    totalRows: number;
  };
}

interface GetUserQueryVariables {
  skip: number;
  pageSize: number;
  searchText: string;
}

export interface UsersProps {}

const Users = function(props: UsersProps & RouteChildrenProps<any>) {
  const [state, setState] = React.useState({ users: users, showForm: false });
  const [tableVars, setTableVars] = React.useState({ page: 1, pageSize: 15, skip: 0, searchText: '' });

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'userRoles',
      key: 'userRoles',
      render: (roles: { id: number; role: string }[]) => {
        return roles.map(role => <Tag>{role.role}</Tag>);
      },
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (vendor: IVendor) => {
        return vendor ? vendor.name : 'Not Assigned';
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: '133px',
      render: (id: number) => {
        const menu = (
          <Menu>
            <Menu.Item key="1" onClick={() => props.history.push(`/corporate/users/edit/${id}`, { id })}>
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
            props.history.push('/corporate/users/add');
            // setState({ ...state, showForm: true });
          }}
        >
          Add User
        </Button>
      </div>
      {!state.showForm && (
        <Query<GetUsersQueryResponse, GetUserQueryVariables>
          query={GET_USERS}
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
                totalRows={data && data.users ? data.users.totalRows : 0}
                columns={userColumns}
                dataSource={data && data.users ? data.users.users : []}
                rowKey="id"
                collection="Users"
                onChange={onChange}
                onShowSizeChange={onShowSizeChange}
              />
            );
          }}
        </Query>

        //         <Query<GetUsersQueryResponse, GetUsersQueryVariables> query={GET_USERS} variable={{skip, pageSize}}>
        // {data, { LoadingSpinner, }}
        //           <Table dataSource={state.users} columns={userColumns} bordered showHeader={true} size="default" />
        //         </Query>
      )}
    </div>
  );
};

export default withRouter(Users);
