import * as React from 'react';
import { UserJob } from 'graphql';
import { IVendorSelectionItem } from '@/components/VendorSelection';

export interface IItemClassAndDescription {
  itemClass: string;
  itemClassDescription: string;
}

export interface IProductWizard {
  vendor: IVendorSelectionItem | undefined;
}

export const productWizardInitialState: IProductWizard = {
  vendor: undefined,
};

export const ProductWizardContext = React.createContext(productWizardInitialState);
export const ProductWizardContextProvider = ProductWizardContext.Provider;
export const ProductWizardContextConsumer = ProductWizardContext.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withDomainContext<P extends { themeContext?: IProductWizard }, R = Omit<P, 'themeContext'>>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P> | React.FunctionComponent<P>,
): React.FunctionComponent<R> {
  return function BoundComponent(props: R) {
    return <ProductWizardContextConsumer>{value => <Component {...props as any} themeContext={value} />}</ProductWizardContextConsumer>;
  };
}
