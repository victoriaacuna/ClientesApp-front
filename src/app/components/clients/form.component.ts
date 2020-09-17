import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import {ClientsService} from './../../services/clients.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { Region } from 'src/app/models/region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public client: Client = new Client();
  public title: String = 'Agrega un cliente';
  public editable: Boolean = false;
  public errors: String[];
  public regions: Region[];

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private actRouter: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getClient();
    this.getRegions();
  }

  public create(): void{
    this.clientService.postClient(this.client).subscribe(
      response => {
        this.router.navigate(['']);
        swal.fire('Nuevo cliente', `${this.client.name} ha sido añadido/a` , 'success')
      },
      err => {
        this.errors=err.error.errors as String[];
        console.log(this.errors);
        console.log('Código del error en el backend: '+ err.status)
      }
    )
  }

  compareRegions(clientRegion: Region, region: Region): Boolean {
    if(clientRegion===undefined && region===undefined){
      return true;
    }
    return (clientRegion===null || region===null || region === undefined || clientRegion === undefined) ? false : clientRegion.id===region.id;
  }

  getClient(): void {
    this.actRouter.params.subscribe(
      params => {
        let id = params['id']
        if(id!=null){
          this.clientService.getClient(id).subscribe( client => {
            this.client = client;
            this.editable=true;
          })
        }
      }
    )
  }

  getRegions(): void{
    this.clientService.getRegions().subscribe( regions => {
      this.regions = regions;
    });
  }

  submit(): void{
    if(this.editable){
      this.update();
    } else {
      this.create();
    }
  }

  update(): void{
    this.client.bills=null;
    this.clientService.updateClient(this.client).subscribe(
      client => {
        this.router.navigate([''])
        swal.fire('Cliente actualizado', `Los datos de ${this.client.name} se han actualizado.`,'success')
      },
      err => {
        this.errors=err.error.errors as String[];
        console.log(this.errors);
        console.log('Código del error en el backend: '+ err.status)
      }
    )
  }
}
