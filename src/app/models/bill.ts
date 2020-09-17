import {BillItem} from './bill-item'
import { Client } from './client';

export class Bill {
  id: number;
  description: string;
  observation: string;
  items: BillItem[] =[];
  client: Client;
  total: number;
  create_at: string;

  getTotal(): number{
    this.total = 0.00;
    this.items.forEach((item:BillItem) => {
      this.total += item.getTotal();
    })
    return this.total;
  }

}
