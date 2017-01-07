import React, { useContext } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePresentationByIdQuery } from 'graphql';
import { SalesPresentationContext } from '@/routes/sales/SalesPresentationContext';
import { IInfoCardProps } from '.';

export default <P extends IInfoCardProps>(Component: React.ComponentType<IInfoCardProps>) => {
  const GetSalesPresentation = (props: P) => {
    const presentationContext = useContext(SalesPresentationContext);
    const id: number | undefined = presentationContext.id ? presentationContext.id! : localStorage.getItem('spid') ? +localStorage.getItem('spid')! : undefined;
    const { loading, data, error } = usePresentationByIdQuery({ variables: { id: id! }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching Sales Presentation </div>;
    if (!id) return <Component {...props} />;
    return <Component {...props} presentation={data!.presentationById} />;
  };
  return GetSalesPresentation;
};
