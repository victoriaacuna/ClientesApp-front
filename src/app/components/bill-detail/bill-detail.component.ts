import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import {Bill} from './../../models/bill';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

  public bill: Bill;
  public title: String ='Detalle de la factura';

  constructor(
    private billService: BillService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe( params => {
      let id = +params.get('id');
      this.billService.getBill(id).subscribe( bill => {
        this.bill = bill;
      })
    })
  }

}
