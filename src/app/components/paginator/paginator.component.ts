import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() public paginator: any;
  public pages: Number[] = [];
  public desde: number;
  public hasta: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginatorUpdated = changes['paginator'];
    if(paginatorUpdated.previousValue){
      this.initPaginator();
    }

  }

  public initPaginator(){
    this.desde = Math.min(Math.max(1, this.paginator.number-4), this.paginator.totalPages-5);
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number+4), 6);
    if(this.paginator.totalPages>5){
      this.pages = new Array(this.hasta-this.desde+1).fill(0).map((value, index) => index+this.desde)
    } else {
      console.log(this.paginator.number);
      this.pages = new Array(this.paginator.totalPages).fill(0).map((value, index) => index+1)
  }
  }

}
