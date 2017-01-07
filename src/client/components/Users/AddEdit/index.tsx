import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import GetUser from './GetUser';
import './index.scss';
import { User, Vendor } from 'graphql';
import AddEditUser from './AddEditUser';
import { CurrentUserContext } from 'client/contexts/CurrentUserContext';
import { some } from 'lodash';

export interface AddEditUserProps extends RouteComponentProps<any> {
  user?: User;
  vendors: Vendor[];
}

const AddEdit = ({ user, vendors, history }: AddEditUserProps) => {
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

  return <AddEditUser user={user!} vendors={vendors} onSave={onSave} onCancel={onCancel} />;
};

export default withRouter(GetUser(AddEdit as any));
