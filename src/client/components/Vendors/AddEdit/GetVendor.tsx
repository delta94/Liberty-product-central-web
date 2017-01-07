import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddEditVendorProps, vendorCategories } from '.';
import { useVendorByIdAndItemClassesQuery, useGetItemClassesForCategoriesQuery } from 'graphql';

export default <P extends AddEditVendorProps>(Component: React.ComponentType<AddEditVendorProps>) => {
  const categories = vendorCategories.reduce((prev, current) => prev.concat([current.value]), new Array<string>());
  const GetVendor = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;

    const { loading, data, error } = useVendorByIdAndItemClassesQuery({ variables: { id: +id, categories: [...categories] }, skip: !id, fetchPolicy: 'network-only' });
    const { loading: itemCategoriesLoading, data: itemCategoriesData, error: itemCategoriesError } = useGetItemClassesForCategoriesQuery({
      variables: { categories: [...categories] },
      skip: id,
      fetchPolicy: 'network-only',
    });
    if (loading) return <LoadingSpinner tip="Loading Client details..." />;
    if (error) return <div className="error">Error while fetching Client details </div>;
    if (itemCategoriesLoading) return <LoadingSpinner tip="Loading Categories and Item Classes..." />;
    if (itemCategoriesError) return <div className="error">Error while fetching Client details </div>;

    if (!id) return <Component {...props} vendor={{}} itemClasses={itemCategoriesData!.getItemClassesForCategories} />;
    return <Component {...props} vendor={data!.vendorById} itemClasses={data!.getItemClassesForCategories} />;
  };
  return GetVendor;
};

// export default <P extends AddEditVendorProps>(Component: React.ComponentType<AddEditVendorProps>) => {
//   class GetVendor extends React.Component<P> {
//     public render() {
//       const id: number | undefined = this.props.location.state ? +this.props.location.state.id : undefined;
//       if (id) {
//         return (
//           <Query query={GET_VENDOR_BY_ID} variables={{ id }} fetchPolicy="network-only">
//             {({ loading, data, error }: any) => {
//               if (loading) return <LoadingSpinner tip="Loading user details..." />;
//               if (error) return <div className="error">Error while fetching user details </div>;
//               return <Component {...this.props} vendor={data.vendorById} />;
//             }}
//           </Query>
//         );
//       } else {
//         return <Component {...this.props} vendor={{ vendorCategories: [] }} />;
//       }
//     }
//   }
//   return GetVendor;
// };
