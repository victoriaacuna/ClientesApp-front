import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import {ClientsService} from '../../services/clients.service';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  @Input() client: Client;
  // public client: Client;
  public title: String = 'Detalle del cliente';
  public selectedImage: File;
  public progress: Number=0;

  constructor(
    private clientService: ClientsService,
    private actRoute: ActivatedRoute,
    public modalService: ModalService,
    public authService: AuthService,
    private billService: BillService,
  ) { }

  ngOnInit(): void {
    console.log('BUENAS')
    console.log(this.client);
    // this.actRoute.paramMap.subscribe( params => {
    //   let id:Number = +params.get('id');
    //   if(id){
    //     this.clientService.getClient(id).subscribe(client => {
    //       this.client = client;
    //     })
    //   }
    // })
  }

  selectImage(event){
    this.selectedImage=event.target.files[0];
    this.progress=0;
    if(this.selectedImage.type.indexOf('image')<0){
      swal.fire('Error!', 'El archivo que seleccionó no es una foto', 'error');
      this.selectedImage=null;
    }
  }

  // uploadImage(){
  //   if(!this.selectedImage){
  //     swal.fire('Error!', 'Debe seleccionar una foto', 'error');
  //   } else {
  //     this.clientService.uploadImage(this.selectedImage, this.client.id).subscribe(response => {
  //       this.client = response;
  //       swal.fire('¡Listo!','¡La foto se subió correctamente!', 'success');
  //     })
  //   }
  // }

  uploadImage(){
    if(!this.selectedImage){
      swal.fire('Error!', 'Debe seleccionar una foto', 'error');
    } else {
      this.clientService.uploadImage(this.selectedImage, this.client.id).subscribe(event => {
        if(event.type===HttpEventType.UploadProgress){
          this.progress = Math.round((event.loaded/event.total)*100);
        } else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.client = response.client as Client;
          this.modalService.notifyUpload.emit(this.client);
          swal.fire('¡Listo!',response.Mensaje, 'success');
          this.progress=0;
        }

      })
    }
  }

  closeModal(){
    this.selectedImage=null;
    this.progress=0;
    this.modalService.closeModal();
  }

  deleteBill(bill:Bill){
    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás segudo?',
    text: `La factura '${bill.description}' será eliminada para siempre...`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, elimínalo',
    cancelButtonText: 'No, consérvalo',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.billService.deleteBill(bill.id).subscribe(
        () => {
              this.client.bills = this.client.bills.filter(f => f!==bill)
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'La factura ha sido removida de la base de datos.',
                'success'
              )
        }
      )

    }
  })
  }

}
