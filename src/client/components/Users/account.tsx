import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import GetMe from './AddEdit/GetMe';
import './AddEdit/index.scss';
import { User, Vendor } from 'graphql';
import AddEditUser from './AddEdit/AddEditUser';
import Header from '../Header';
import { CurrentUserContext } from 'client/contexts/CurrentUserContext';
import { some } from 'lodash';

export interface AccountProps extends RouteComponentProps<any> {
  user?: User;
  vendors: Vendor[];
}

const Account = ({ user, vendors, history }: AccountProps) => {
  const userContext = React.useContext(CurrentUserContext);
  const onSave = () => {
    if (some(userContext.user.userRoles, userRole => userRole === 'Administrator')) {
      setTimeout(() => history.push('/corporate/users'), 500);
    } else {
      setTimeout(() => history.push('/partners'), 500);
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <Header />
      <div style={{ margin: 20 }}>
        <AddEditUser user={user!} vendors={vendors} onSave={onSave} onCancel={onCancel} />
      </div>
    </React.Fragment>
  );
};

export default withRouter(GetMe(Account as any));
