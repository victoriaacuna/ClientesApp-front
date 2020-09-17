import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import swal from 'sweetalert2';
import {AuthService} from './../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public title: String = 'Iniciar sesión';
  public user: User;

  constructor(
    private route: Router,
    private authService: AuthService,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('¡Ya has iniciado sesión!', `Hola, ${this.authService.user.username}. Hace poco iniciaste sesión`, 'info');
      this.route.navigate(['']);
    }
  }

  login(): void{
    console.log(this.user);
    if(this.user.username==null || this.user.password==null){
      swal.fire('Error en el inicio de sesión.', 'El usuario y la contraseña no pueden estar vacías.', 'error');
    }
    this.authService.login(this.user).subscribe( response => {

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      this.route.navigate([''])
      swal.fire('Login', `¡Bienvenid@, ${user.name}!`, 'success');
    }, error => {
      if(error.status==400){
        swal.fire('Error', 'Usuario o clave incorrecta', 'error');
      }
    });
  }


}
