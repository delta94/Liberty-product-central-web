import { IProductImage } from './productImage';

export interface IProduct {
  ProductId: number;
  ProductCategory: string;
  ProductClass: string;
  ProductItem: number;
  IsKit: boolean;
  CreatedDate: Date;
  ModifiedDate?: Date;
  Images?: IProductImage[];
}
