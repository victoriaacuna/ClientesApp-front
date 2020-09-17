import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe( catchError ( error => {
      if(error.status==401){
        if(this.authService.isAuthenticated()){
          this.authService.logout();
        }
        this.router.navigate(['/login'])
      }
      if(error.status==403){
        swal.fire('Acceso denegado', `${this.authService.user.name} no tienes acceso a este recurso.`, 'warning');
        this.router.navigate([''])
      }
      return throwError(error);
    }));
  }

}
