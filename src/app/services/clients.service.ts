import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
// import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { Region } from '../models/region';
import { AuthService } from './auth.service';
import {URL_BACKEND} from './../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url: String = URL_BACKEND+'api';
  // private httpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json'
  // });

  constructor(
    private http: HttpClient,
    private router: Router,
    // private authService: AuthService,
  ) { }

  // addAuthorizationHeader(){
  //   let token = this.authService.token;
  //   if(token!=null){
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   } else {
  //     return this.httpHeaders;
  //   }
  // }

  getClientes(): Observable<Client[]> {
    // La de abajo es otra forma de hacerlo.
    return this.http.get<Client[]>(this.url+'/clients');

    // return this.http.get(this.url+'clients').pipe(
    //   map(response => {
    //     let clients = response as Client[];
    //     return clients.map( c => {
    //       c.name = c.name.toUpperCase();
    //       return c;
    //     });
    //   })
    // );

  }

  getRegions(): Observable<Region[]>{
    return this.http.get<Region[]>(this.url+'/clients/regions'
    // , {headers: this.addAuthorizationHeader()}
  )
  // .pipe(
  //     catchError(e => {
  //       this.isUnauthorized(e);
  //       return throwError(e);
  //     })
  //   );
  }

  getClientesPageable(page: Number): Observable<any> {
    return this.http.get(this.url+'/clients/page/'+page);
  }

  postClient(client: Client): Observable<Client>{
    return this.http.post<Client>(this.url+'/clients', client
    // , {headers: this.addAuthorizationHeader()}
  ).pipe(
      catchError(e => {

        // if(this.isUnauthorized(e)){
        //   return throwError(e);
        // }

        if(e.error.Mensaje){
          // swal.fire('Error', e.error.Mensaje, 'error');
          console.log(e.error.Mensaje);
        }
        return throwError(e);

      })
    );
  }

  getClient(id: Number): Observable<Client>{
    return this.http.get<Client>(this.url+'/client/'+id
    // , {headers: this.addAuthorizationHeader()}
  ).pipe(
      catchError(e => {

        // if(this.isUnauthorized(e)){
        //   return throwError(e);
        // }

        // El error.Mensaje el "Mensaje" es un atributo del error que fue declarado en el backend.
        if(e.status!=401 && e.error.Mensaje){
          this.router.navigate(['']);
          // swal.fire('Error', e.error.Mensaje, 'error');
          console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    )
  }

  updateClient(client: Client): Observable<Client>{
    return this.http.put<Client>(this.url+'/client/'+client.id, client
    // , {headers: this.addAuthorizationHeader()}
  ).pipe(
      catchError( e => {
        this.router.navigate(['']);
        // if(this.isUnauthorized(e)){
        //   return throwError(e);
        // }
        if(e.error.Mensaje){
          // swal.fire('Error', e.error.Mensaje, 'error');
          console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    );
  }

  deleteClient(id: Number): Observable<Client> {
    return this.http.delete<Client>(this.url+'/client/'+id
    // , {headers: this.addAuthorizationHeader()}
  ).pipe(
      catchError( e => {
        // if(this.isUnauthorized(e)){
        //   return throwError(e);
        // }
        // swal.fire('Error', e.error.Mensaje, 'error');
        if(e.error.Mensaje){
          console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    );
  }

  // uploadImage(image: File, id): Observable<Client>{
  //   let formData = new FormData();
  //   console.log(image);
  //   // El valor del campo del formdata ('imageFile') tiene que ser igual a como lo llamaste en el backend.
  //   formData.append('imageFile', image);
  //   formData.append('id', id);
  //   return this.http.post(this.url+'/client/upload', formData).pipe(
  //     map( (response:any) => response.client as Client),
  //     catchError( err => {
  //       console.log(err.error.Mensaje);
  //       swal.fire('Error', err.error.Mensaje, 'error');
  //       return throwError(err);
  //     })
  //   )
  // }

  uploadImage(image: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    console.log(image);
    // El valor del campo del formdata ('imageFile') tiene que ser igual a como lo llamaste en el backend.
    formData.append('imageFile', image);
    formData.append('id', id);

    // let httpHeaders = new HttpHeaders();
    // let token = this.authService.token;
    // if(token!=null){
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    // }

    const req = new HttpRequest('POST', this.url+'/client/upload', formData, {
      reportProgress: true,
      // headers: httpHeaders
    });
    return this.http.request(req)
    // .pipe(
    //   catchError(e => {
    //     this.isUnauthorized(e);
    //     return throwError(e);
    //   })
    // );
  }

  // private isUnauthorized(error): Boolean{
  //   if(error.status==401){
  //
  //     if(this.authService.isAuthenticated()){
  //       this.authService.logout();
  //     }
  //
  //     this.router.navigate(['/login'])
  //     return true;
  //   }
  //   if(error.status==403){
  //     swal.fire('Acceso denegado', `${this.authService.user.name} no tienes acceso a este recurso.`, 'warning');
  //     this.router.navigate([''])
  //     return true;
  //   }
  //   return false;
  // }


}
