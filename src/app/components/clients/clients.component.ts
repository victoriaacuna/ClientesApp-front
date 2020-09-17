import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';
import {URL_BACKEND} from './../../config/config';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public clients: Client[] = [];
  public paginator: any;
  public selectedClient: Client=null;
  public urlBackend: string = URL_BACKEND;

  constructor(
    private clientService: ClientsService,
    private actRoute: ActivatedRoute,
    public modalService: ModalService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(
      params => {
        let page = Number(params.get('page'));
        console.log(page);
        if(page!=null){
          this.clientService.getClientesPageable(page).subscribe(
            response => {
              this.clients= response.content as Client[];
              console.log(response);
              this.paginator = response;
            }
          )
        } else {
          this.clientService.getClientes().subscribe( response => {
            this.clients = response;
          })
        }

      }
    );
    this.modalService.notifyUpload.subscribe(client => {
      this.clients = this.clients.map(originalClient => {
        if(client.id == originalClient.id){
          originalClient.image = client.image;
        }
        return originalClient;
      })
    })

  }

  deleteClient(client: Client): void{

    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás segudo?',
    text: `Los datos de ${client.name} serán eliminados para siempre...`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, elimínalo',
    cancelButtonText: 'No, consérvalo',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.clientService.deleteClient(client.id).subscribe(
        client => {
          this.clientService.getClientes().subscribe(
            clients => {
              this.clients = clients
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'El cliente ha sido removido de la base de datos.',
                'success'
              )
            }
          )
        }
      )

    }
  })

  }

  selectClient(client: Client):void{
    this.selectedClient=client;
    console.log('hi')
    console.log(this.selectedClient)
    this.modalService.openModal();
  }

}
