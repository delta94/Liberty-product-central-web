import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import VendorSelection, { IVendorSelectionItem } from '@/components/VendorSelection';
import { ProductWizardContext } from '../ProductWizardContext';
import InputForm from '@/components/AmazonFormInput/components/InputForm';

export interface IAddProps extends RouteComponentProps<any> {}

export default (props: IAddProps) => {
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

  const done = (): void => {
    props.history.push('/corporate/products/step-2');
  };
  const onAdd = (item: string): void => {
    props.history.push('/corporate/products/step-2');
  };

  return (
    <div>
      <InputForm done={done} onAdd={onAdd} />
    </div>
  );
};
