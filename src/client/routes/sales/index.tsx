import * as React from 'react';
import Header from '@/components/Header';
import { Menu } from 'antd';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import SalesPresentations from './Components/SalesPresentations';
import Wizard from './Components/Wizard';

export interface AdministrationProps {}

const SalesPresentationsPage = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Header />
      <div style={{ margin: 0 }}>
        <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/list`} />} />
        <Route path={`${props.match.url}/list`} component={SalesPresentations} />
        <Route path={`${props.match.url}/wizard`} component={Wizard} />
      </div>
    </div>
  );
};

export default withRouter(SalesPresentationsPage);
