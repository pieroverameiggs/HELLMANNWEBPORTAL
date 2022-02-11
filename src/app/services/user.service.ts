import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Module } from '../interfaces/module.interface';
import { User } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { eHttpStatusCode } from '../model/enums.model';

const base_url = environment.base_url_apisec;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public user: User | any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  saveLocalStorage(token: string, menu: Module[], user: User) {
    const modules = menu.map(module => {
      return {
        INT_MODULEID: module.INT_MODULEID,
        INT_PARENTMODULE: module.INT_PARENTMODULE,
        icon: module.VCH_IMAGE,
        path: module.VCH_PAGE,
        text: module.VCH_MODULENAME
      }
    });

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(modules));
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(formData: any) {
    return this.http.post(`${base_url}/Login/AuthenticatePortalCustomer`, formData)
      .pipe(
        tap((resp: any) => {          
          if(resp.Code == eHttpStatusCode.OK)
          {
            this.user = { 
              VCH_FULLNAME: resp.Object.VCH_FULLNAME, 
              VCH_USEREMAIL: resp.Object.VCH_USEREMAIL 
            };

            this.saveLocalStorage(resp.Object.Token, resp.Object.Modules, this.user);
          }
        })
      );
  }

  // Use Guard
  validateToken(): Observable<boolean> {

    const requestValid = {
      strValue: this.token,
      boolValue: true
    };

    return this.http.post(`${base_url}/Login/VerifyToken`, requestValid)
      .pipe(
        map((resp: any) => {
          //console.log(resp);          
          return resp.Object.Correct;
        }),
        catchError(error => of(false))
      );
  }

  verifyAccount(userName: string){
    return this.http.get(`${base_url}/Login/VerifyAccount?userName=${userName}`);
  }

  forgotPassword(request: any){
    return this.http.post(`${base_url}/Login/ForgotPasswordCustomerPortal`, request);
  }

  resetPassword(request: any){
    return this.http.post(`${base_url}/Login/ResetPassword`, request);
  }

  verifyToken(token: string){
    return this.http.get(`${base_url}/Login/VerifyToken?token=${token}`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('user');
    localStorage.removeItem('entity');
    localStorage.removeItem('groupEntity');

    this.router.navigateByUrl('/login');
  }
}
