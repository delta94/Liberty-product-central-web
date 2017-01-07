import React, { useContext } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePresentationByIdAndPhotosQuery } from 'graphql';
import { SalesPresentationContext } from '@/routes/sales/SalesPresentationContext';
import { RouteComponentProps } from 'react-router';

export default <P extends RouteComponentProps<any>>(Component: React.ComponentType<any>) => {
  const GetPhotos = (props: P) => {
    // console.log('from GetPhotos', props.location.state.index, props.location.state.itemClass, props.location.state.itemNumber, props.match.params.id);
    const presentationContext = useContext(SalesPresentationContext);
    const id: number | undefined = presentationContext.id ? presentationContext.id! : localStorage.getItem('spid') ? +localStorage.getItem('spid')! : undefined;
    const { loading, data, error } = usePresentationByIdAndPhotosQuery({
      variables: { id: id!, itemClassIndex: +localStorage.getItem('idx')! },
      skip: !id,
      fetchPolicy: 'network-only',
    });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching Sales Presentation </div>;
    if (!id) return <Component {...props} />;
    return <Component {...props} currentData={data!.presentationByIdAndPhotos} />;
  };
  return GetPhotos;
};
