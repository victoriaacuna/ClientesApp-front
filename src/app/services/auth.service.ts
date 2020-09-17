import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {URL_BACKEND} from './../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;

  url:string=URL_BACKEND+'oauth/token';

  constructor(private http: HttpClient) { }

  login(user: User):Observable<any>{
    console.log('metodo login')
    console.log(user)
    const credentials=btoa('angularapp'+':'+'contrasenasecreta');
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic '+ credentials});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<any>(this.url, params.toString(), {headers: headers});
  }

  saveUser(access_token: string): void{

    let payload = this.getDataToken(access_token);
    this._user = new User();
    this._user.name = payload.name;
    this._user.last_name = payload.last_name;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));

  }

  saveToken(access_token: string): void{
    this._token=access_token;
    sessionStorage.setItem('token', access_token);
  }

  getDataToken(access_token: string): any{
    if(access_token!=null){
      return JSON.parse(atob(access_token.split(".")[1]));
    } else {
      return null;
    }
  }

  public get user(): User{
    if(this._user!=null){
      return this._user;
    } else if (this._user==null && sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    } else {
      return new User();
    }
  }

  public get token(): string{
    if(this._token!=null){
      return this._token;
    } else if (this._token==null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this.token;
    } else {
      return null;
    }
  }

  public isAuthenticated(): Boolean{
    let payload = this.getDataToken(this.token);
    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    } else {
      return false;
    }
  }

  logout():void{
    this._user=null;
    this._token=null;
    sessionStorage.clear();
    // Esto es borrando por separado las variables del sessionStorage;
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('user');
  }

  hasRole(rol:string): Boolean{
    if(this.user.roles.includes(rol)){
      return true;
    }
    return false;
  }

}
