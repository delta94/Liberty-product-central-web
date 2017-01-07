import * as React from 'react';
import Header from '@/components/Header';
import { Menu } from 'antd';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import OrderTransfer from './order-transfer';

export interface SupportProps {}

const Support = function(props: SupportProps & RouteComponentProps<any>) {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
        <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/order-transfer`} />} />
        <Route path={`${props.match.url}/order-transfer`} component={OrderTransfer} />
      </div>
    </div>
  );
};

export default withRouter(Support);
