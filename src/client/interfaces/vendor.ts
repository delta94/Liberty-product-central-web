export interface IVendor {
  id?: number;
  name: string;
  logo?: string;
  vendorCategories: IVendorCategory[];
}

export interface IVendorCategory {
  id: number;
  category: string;
  itemClasses: IVendorCategoryItemClass[];
}

export interface IVendorCategoryItemClass {
  id: number;
  itemClass: string;
}

export interface ILoggedInVendor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
