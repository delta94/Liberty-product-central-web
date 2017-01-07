import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import VendorSelection, { IVendorSelectionItem } from '@/components/VendorSelection';
import { ProductWizardContext } from '../ProductWizardContext';

export interface IStep1Props extends RouteComponentProps<any> {}

export default (props: IStep1Props) => {
  const productWizardContext = React.useContext(ProductWizardContext);
  const next = async (vendor: IVendorSelectionItem) => {
    try {
      productWizardContext.vendor = vendor;
      // await saveUserJob({ variables: { data: { fileType, status: UserJobStatusEnum.InProgress } } });
      // productWizardContext.step = 1;
      props.history.push('/corporate/products/step-2');
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  return (
    <div>
      <VendorSelection next={next} />
    </div>
  );
};
