import React from 'react';
import { Query } from 'react-apollo';
import LoadingSpinner from '@/components/LoadingSpinner';
import { GET_USER_BY_ID } from '../User.queries';
import { AddEditUserProps } from './';
import { GET_VENDORS } from '@/components/Vendors/Vendor.queries';

export default <P extends AddEditUserProps>(Component: React.ComponentType<AddEditUserProps>) => {
  class GetUser extends React.Component<P> {
    public render() {
      const id: number | undefined = this.props.location.state ? +this.props.location.state.id : undefined;
      if (id) {
        return (
          <Query query={GET_USER_BY_ID} variables={{ id }} fetchPolicy="network-only">
            {({ loading, data, error }: any) => {
              if (loading) return <LoadingSpinner tip="Loading user details..." />;
              if (error) return <div className="error">Error while fetching user details </div>;
              return <Component {...this.props} user={data.userById} vendors={data.vendors.vendors} />;
            }}
          </Query>
        );
      } else {
        return (
          <Query query={GET_VENDORS} variables={{ skip: 0, pageSize: 100, searchText: '' }}>
            {({ loading, data, error }: any) => {
              if (loading) return <LoadingSpinner tip="Loading user details..." />;
              if (error) return <div className="error">Error while fetching vendors </div>;
              return <Component {...this.props} user={{}} vendors={data.vendors.vendors} />;
            }}
          </Query>
        );
      }
    }
  }
  return GetUser;
};
