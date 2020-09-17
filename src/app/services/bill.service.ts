import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from './../models/bill';
import { Product } from '../models/product';
import {URL_BACKEND} from './../config/config';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url: string = URL_BACKEND+'api/bill';
  constructor(
    private http: HttpClient,
  ) { }

  getBill(id: number): Observable<Bill>{
    return this.http.get<Bill>(`${this.url}/${id}`);
  }

  deleteBill(id: number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  filterProducts(term: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/filter-product/${term}`);
  }

  postBill(bill:Bill): Observable<Bill>{
    return this.http.post<Bill>(this.url+'/create', bill);
  }

}
