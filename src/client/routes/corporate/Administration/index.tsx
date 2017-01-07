import * as React from 'react';
import Header from '../../../components/Header';
import { Menu } from 'antd';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import AddEdit from '@/components/Users/AddEdit';
import Users from '../Users';

export interface AdministrationProps {}

const Administration = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
        <Users />
        <Route path="/corporate/administration/vendors" exact component={Users} />
        <Route path="/corporate/administration/users" exact component={Users} />
        <Route path={`${props.match.url}/users/add`} component={AddEdit} />
        <Route path="/corporate/administration/users/edit" component={Users} />
        <Route path="/corporate/administration/permissions" exact component={Users} />
      </div>
    </div>
  );
};

export default withRouter(Administration);
