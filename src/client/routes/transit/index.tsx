import * as React from 'react';
import Header from '@/components/Header';
import { Menu } from 'antd';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Transfer from './Transfer';

export interface AdministrationProps {}

const Corporate = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Header />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px', backgroundColor: 'rgb(56, 60, 79)' }}>
        <Menu.Item key="1">
          <Link to="/transit/transfer">In Transit Transfer</Link>
        </Menu.Item>
      </Menu>
      <div style={{ margin: 20 }}>
        <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/transit`} />} />
        <Route path={`${props.match.url}/transfer`} component={Transfer} />
      </div>
    </div>
  );
};

export default withRouter(Corporate);
