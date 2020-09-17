import { Product } from './product';

export class BillItem {
  product: Product;
  quantity: number = 1;
  total: number;

  public getTotal(): number{
    return this.quantity*this.product.price;
  }

}
