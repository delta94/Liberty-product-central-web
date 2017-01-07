import { IVendor } from './vendor';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password?: string;
  active: boolean;
  userRoles: string[];
  vendor?: IVendor;
  created?: Date;
  modified?: Date;
}

export interface ILoggedInUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: string[];
}
