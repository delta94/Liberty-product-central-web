import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { GET_ME } from './route.queries';
import { CurrentUserConsumer } from '../../contexts/CurrentUserContext';
import { ILoggedInUser } from '../../interfaces/user';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Query } from '@apollo/react-components';
import { useQuery } from 'react-apollo';
import { some } from 'lodash';

interface CorporateRouteProps extends RouteComponentProps<any> {
  component: React.ComponentType;
  userRole: string;
}

interface MeResponse {
  me: ILoggedInUser;
}

const PrivateRoute = <P extends CorporateRouteProps>({ component: Component, userRole, ...rest }: P & any) => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <LoadingSpinner />;
  console.log('data.me', data.me);
  const isAllowed = userRole ? (data.me ? some(data.me.userRoles, userRole => userRole === userRole) : false) : true;
  if (!isAllowed) {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )}
      />
    );
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PrivateRoute;
