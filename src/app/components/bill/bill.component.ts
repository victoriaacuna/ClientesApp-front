import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { ClientsService } from 'src/app/services/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { BillService } from 'src/app/services/bill.service';
import { Product } from 'src/app/models/product';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { BillItem } from 'src/app/models/bill-item';
import swal from 'sweetalert2';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  public title: String = 'Crea una nueva factura';
  public bill: Bill = new Bill();
  public autocompleteControl = new FormControl();
  public products: string[] = ['One', 'Two', 'Three'];
  public filteredProducts: Observable<Product[]>;

  constructor(
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let clientId = +params.get('clientId');
      this.clientService.getClient(clientId).subscribe( client => {
        this.bill.client = client
      });
    });
    this.filteredProducts = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.name),
        flatMap(value => value ? this._filter(value):[])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.billService.filterProducts(filterValue);
  }

  showName(product?:Product): string | undefined{
    return product? product.name:undefined;
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void{
    let product = event.option.value as Product;
    console.log(product);

    if(this.doesItemExist(product.id)){
      this.increaseQuantity(product.id);
    } else {
      let newItem = new BillItem();
      newItem.product = product;
      this.bill.items.push(newItem);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  updateQuantity(id:number, event:any): void{
    let quantity:number = event.target.value as number;
    if(quantity<=0){
      this.deleteItem(id);
    } else {
      this.bill.items = this.bill.items.map((item:BillItem) => {
        if(id===item.product.id){
          item.quantity=quantity;
        }
        return item;
      });
    }
  }

  doesItemExist(productId: number): Boolean{
    let exists = false;
    this.bill.items.forEach( (item: BillItem) => {
      if(productId==item.product.id){
        exists=true;
      }
    });
    return exists;
  }

  increaseQuantity(productId: number): void{
    this.bill.items = this.bill.items.map((item:BillItem) => {
      if(productId===item.product.id){
        ++item.quantity;
      }
      return item;
    });
  }

  deleteItem(id:number):void{
    this.bill.items = this.bill.items.filter((item:BillItem) => {
      id!==item.product.id
    })
  }

  postBill():void{
    this.billService.postBill(this.bill).subscribe( bill => {
      swal.fire('¡'+bill.description+' creada!', 'La factura ha sido creada con éxito', 'success');
      this.router.navigate(['bill/', bill.id]);
    })
  }

}
