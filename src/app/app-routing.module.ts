import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { ClientsComponent } from './components/clients/clients.component';
import {FormComponent} from './components/clients/form.component';
import {ClientDetailComponent} from './components/client-detail/client-detail.component';
import {LoginComponent} from './components/user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard} from './guards/role.guard';
import {BillDetailComponent} from './components/bill-detail/bill-detail.component';
import {BillComponent} from './components/bill/bill.component';

const routes: Routes = [

  {path: 'clients', component: ClientsComponent},
  {path: 'clients/page/:page', component: ClientsComponent},
  {path: '', component: HomeComponent},
  {path: 'client/create', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'client/edit/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'bill/:id', component: BillDetailComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_USER'}},
  {path: 'bill/create/:clientId', component: BillComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  // {path: 'client/:id', component: ClientDetailComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
