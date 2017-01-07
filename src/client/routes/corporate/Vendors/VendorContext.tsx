import * as React from 'react';
import { CategoryItemClassGroup } from 'graphql';
import { Vendor } from 'graphql';

export interface IItemClassAndDescription {
  itemClass: string;
  itemClassDescription: string;
}

export interface IVendor {
  vendor: Vendor | null;
  groups: CategoryItemClassGroup | null;
  selectedCategories: string[];
  itemClasses: string[];
  selectedItemClasses: { category: string; itemClasses: string[] }[];
}

export const VendorInitialState: IVendor = {
  vendor: null,
  groups: null,
  selectedCategories: [],
  itemClasses: [],
  selectedItemClasses: [],
};

export const VendorContext = React.createContext(VendorInitialState);
export const VendorContextProvider = VendorContext.Provider;
export const VendorContextConsumer = VendorContext.Consumer;

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export function withDomainContext<P extends { themeContext?: IVendor }, R = Omit<P, 'themeContext'>>(
//   Component: React.ComponentClass<P> | React.StatelessComponent<P> | React.FunctionComponent<P>,
// ): React.FunctionComponent<R> {
//   return function BoundComponent(props: R) {
//     return <VendorContextConsumer>{value => <Component {...props as any} themeContext={value} />}</VendorContextConsumer>;
//   };
// }
