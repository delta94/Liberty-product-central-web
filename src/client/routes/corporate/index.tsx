import * as React from 'react';
import Header from '@/components/Header';
import { Menu } from 'antd';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Wizard from './Wizard';
import Users from './Users';
import Vendors from './Vendors';
import OrderTransfer from '../support/order-transfer';

export interface AdministrationProps {}

const Corporate = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
        <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/users`} />} />
        <Route path={`${props.match.url}/vendors`} component={Vendors} />
        <Route path={`${props.match.url}/users`} component={Users} />
        <Route path={`${props.match.url}/products`} component={Wizard} />
        <Route path={`${props.match.url}/order-transfer`} component={OrderTransfer} />
      </div>
    </div>
  );
};

export default withRouter(Corporate);
