import * as React from 'react';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import Wizard from './Wizard';

export interface AdministrationProps {}

const Corporate = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Route exact path={props.match.url} render={() => <Redirect to={`${props.match.url}/wizard`} />} />
      <Route path={`${props.match.url}/wizard`} component={Wizard} />
    </div>
  );
};

export default withRouter(Corporate);
