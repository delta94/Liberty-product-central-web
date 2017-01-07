import * as React from 'react';
import Header from '@/components/Header';
import { Menu } from 'antd';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Xpo from './Xpo';

export interface AdministrationProps {}

const Corporate = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
        <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/utils`} />} />
        <Route path={`${props.match.url}/utils`} component={Xpo} />
      </div>
    </div>
  );
};

export default withRouter(Corporate);
