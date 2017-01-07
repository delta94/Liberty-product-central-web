import * as React from 'react';
import Users from '../../../components/Users';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import AddEdit from '@/components/Users/AddEdit';

export interface AdministrationProps {}

const Administration = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Route exact path={`${props.match.url}`} component={Users} />
      <Route exact path={`${props.match.url}/add`} component={AddEdit} />
      <Route exact path={`${props.match.url}/edit/:id`} component={AddEdit} />
    </div>
  );
};

export default withRouter(Administration);
