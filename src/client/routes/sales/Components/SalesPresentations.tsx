import * as React from 'react';
import { Button, Dropdown, Menu, Icon } from 'antd';
import shortid from 'shortid';
import { withRouter, RouteChildrenProps } from 'react-router';
import TableWithPagination from '@/components/TableWithPagination';
import { useSalesPresentationsQuery, useDeletePresentationMutation, SalesPresentationsDocument } from 'graphql';
import { SalesPresentationContext } from '@/routes/sales/SalesPresentationContext';

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

export interface UsersProps {}

const SalesPresentations = function(props: UsersProps & RouteChildrenProps<any>) {
  const [state, setState] = React.useState({ users: users, showForm: false });
  const [tableVars, setTableVars] = React.useState({ page: 1, pageSize: 15, skip: 0, searchText: '' });
  const { data, loading, error } = useSalesPresentationsQuery({ fetchPolicy: 'network-only' });
  const presentationContext = React.useContext(SalesPresentationContext);
  const [deletePresentation] = useDeletePresentationMutation();

  const userColumns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Presentation Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: '133px',
      render: (id: number) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="1"
              onClick={() => {
                localStorage.setItem('spid', id.toString());
                presentationContext.id = id;
                props.history.push(`/sales-presentations/wizard`);
              }}
            >
              <Icon type="edit" />
              Edit
            </Menu.Item>
            <Menu.Item key="2" onClick={async () => await deleteAction(id)}>
              <Icon type="delete" />
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

  const deleteAction = async (id: number) => {
    await deletePresentation({
      variables: { id },
      refetchQueries: [
        {
          query: SalesPresentationsDocument,
        },
      ],
    });
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    setTableVars({ ...tableVars, pageSize });
  };

  const onChange = (page: number, pageSize?: number) => {
    pageSize = pageSize ? pageSize : 15;
    setTableVars({ ...tableVars, pageSize, skip: (page - 1) * pageSize, page });
  };

  if (error) return <h1>ERROR</h1>;

  return (
    <div style={{ width: '100%', padding: 20 }}>
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          style={{ marginBottom: 20 }}
          onClick={() => {
            localStorage.removeItem('spid');
            presentationContext.id = null;
            props.history.push('/sales-presentations/wizard');

            // setState({ ...state, showForm: true });
          }}
        >
          Add Presentation
        </Button>
      </div>
      <TableWithPagination
        loading={loading}
        page={tableVars.page}
        pageSize={tableVars.pageSize}
        totalRows={data && data.salesPresentations ? data.salesPresentations.totalRows : 0}
        columns={userColumns}
        dataSource={data && data.salesPresentations ? data.salesPresentations.presentations : []}
        rowKey="id"
        collection="Users"
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};

export default withRouter(SalesPresentations);
