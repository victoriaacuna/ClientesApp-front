import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    swal.fire('¡Cerraste sesión!', `Hasta pronto`, 'info');
    this.router.navigate(['/login'])
  }

}
