import { IVendor } from './vendor';
import { IVendorCategory } from './vendorCategory';

export interface IVendorCategoryItemClass {
  id: number;
  vendorId: number;
  vendorCategoryId: number;
  itemClass: String;
  created?: Date;
  modified?: Date;
  vendor: IVendor;
  vendorCategory: IVendorCategory;
}
