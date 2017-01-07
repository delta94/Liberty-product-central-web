import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useMeAndVendorsForSelectionQuery } from 'graphql';
import { AccountProps } from '../account';

export default <P extends AccountProps>(Component: React.ComponentType<AccountProps>) => {
  const GetClient = (props: P) => {
    const { loading, data, error } = useMeAndVendorsForSelectionQuery({ fetchPolicy: 'network-only' });
    if (loading) return <LoadingSpinner tip="Loading Your Account Profile..." />;
    if (error) return <div className="error">Error while fetching Your Account Profile</div>;
    console.log('GetMe', data!.getMe);
    return <Component {...props} user={data!.getMe} vendors={data!.vendors} />;
  };
  return GetClient;
};
