import * as React from 'react';
import { ICategory } from '../categories';
import { CategoryItemClassDescription } from '../Wizard.queries';
import categories from '../categories';
import { UserJob } from 'graphql';

export interface IItemClassAndDescription {
  itemClass: string;
  itemClassDescription: string;
}

export interface IPartnerWizard {
  step: number;
  fileType: string;
  userJob: UserJob | null;
  categories: ICategory[];
  selectedCategories: string[];
  itemClasses: CategoryItemClassDescription[];
  selectedItemClasses: { category: string; itemClasses: IItemClassAndDescription[] }[];
  selectAllItemClasses: boolean;
}

export const partnerWizardInitialState: IPartnerWizard = {
  step: 0,
  fileType: '',
  userJob: null,
  categories,
  selectedCategories: [],
  itemClasses: [],
  selectedItemClasses: [],
  selectAllItemClasses: false,
};

export const PartnerWizardContext = React.createContext(partnerWizardInitialState);
export const PartnerWizardContextProvider = PartnerWizardContext.Provider;
export const PartnerWizardContextConsumer = PartnerWizardContext.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withDomainContext<P extends { themeContext?: IPartnerWizard }, R = Omit<P, 'themeContext'>>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P> | React.FunctionComponent<P>,
): React.FunctionComponent<R> {
  return function BoundComponent(props: R) {
    return <PartnerWizardContextConsumer>{value => <Component {...props as any} themeContext={value} />}</PartnerWizardContextConsumer>;
  };
}
