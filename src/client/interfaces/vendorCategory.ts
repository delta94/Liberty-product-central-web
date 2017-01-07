import { IVendor } from './vendor';
import { IVendorCategoryItemClass } from './vendorCategoryItemClass';

export interface IVendorCategory {
  id: number;
  vendorId: number;
  category: String;
  created?: Date;
  modified?: Date;
  vendor: IVendor;
  itemClasses: IVendorCategoryItemClass[];
}
