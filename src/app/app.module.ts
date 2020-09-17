import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormComponent} from './components/clients/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { LoginComponent } from './components/user/login/login.component';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { BillDetailComponent } from './components/bill-detail/bill-detail.component';
import { BillComponent } from './components/bill/bill.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ClientsComponent,
    HomeComponent,
    FormComponent,
    PaginatorComponent,
    ClientDetailComponent,
    LoginComponent,
    BillDetailComponent,
    BillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
