import React from 'react';
import { SalesPresentation } from 'graphql';

export interface ISalesPresentationInitialState {
  id?: number | null;
  name?: string | null;
  itemClassIndex: number;
  customer: {
    name: string;
    number: string;
  };
  itemClasses: Array<{
    itemClass: string | null;
    itemNumbers: string[];
  }>;
  setPresentation: (presentation: SalesPresentation | undefined) => void;
}
export const salesPresentationInitialState: ISalesPresentationInitialState = {
  id: null,
  name: null,
  customer: {
    name: '',
    number: '',
  },
  itemClasses: [],
  itemClassIndex: 0,
  setPresentation(presentation: SalesPresentation | undefined) {
    if (presentation) {
      salesPresentationInitialState.id = presentation.id!;
      salesPresentationInitialState.name = presentation.name!;
      salesPresentationInitialState.customer = {
        name: presentation.customerName!,
        number: presentation.customerNumber!,
      };
      salesPresentationInitialState.itemClasses = presentation.itemClasses!.reduce(
        (prev, curr) =>
          prev.concat([{ itemClass: curr.itemClass, itemNumbers: curr.itemNumbers!.reduce((p, c) => p.concat([c.itemNumber]), new Array<string>()) }]),
        new Array<{ itemClass: string; itemNumbers: string[] }>()
      );
    }
  },
};

export const SalesPresentationContext = React.createContext(salesPresentationInitialState);
export const SalesPresentationContextProvider = SalesPresentationContext.Provider;
export const SalesPresentationContextConsumer = SalesPresentationContext.Consumer;
