import * as React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePresentationByIdAndRelatedQuery } from 'graphql';
import { RouteComponentProps } from 'react-router';

export default <P extends RouteComponentProps<any>>(Component: React.ComponentType<any>) => {
  const GetSalesPresentation = (props: P) => {
    const id: number | undefined = localStorage.getItem('spid') ? +localStorage.getItem('spid')! : undefined;
    const { loading, data, error } = usePresentationByIdAndRelatedQuery({
      variables: { id: id!, itemClassIndex: +localStorage.getItem('idx')! },
      skip: !id,
      fetchPolicy: 'network-only',
    });
    if (loading) return <LoadingSpinner tip="Loading Item Class Information..." />;
    if (error) return <div className="error">Error while fetching Sales Presentation </div>;
    if (!id) return <Component {...props} />;
    return <Component {...props} presentation={data!.presentationByIdAndRelated} />;
  };
  return GetSalesPresentation;
};
