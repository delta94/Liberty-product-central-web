import * as React from 'react';
import Vendors from '../../../components/Vendors';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import AddEdit from '@/components/Vendors/AddEdit';

export interface AdministrationProps {}

const Administration = function(props: AdministrationProps & RouteComponentProps<any>) {
  return (
    <div>
      <Route path={`${props.match.url}/`} exact component={Vendors} />
      <Route path={`${props.match.url}/add`} component={AddEdit} />
      <Route path={`${props.match.url}/edit/:id`} component={AddEdit} />
    </div>
  );
};

export default withRouter(Administration);
