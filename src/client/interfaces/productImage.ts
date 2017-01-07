import { IProduct } from './product';

export interface IProductImage {
  ProductId: number;
  ProductImageId: number;
  ProductImageURL: string;
  CreatedDate: Date;
  ModifiedDate?: Date;
  Product?: IProduct;
}
