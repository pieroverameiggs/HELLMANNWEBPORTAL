import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Module } from '../interfaces/module.interface';

const base_url = environment.base_url_webapi;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveLocalStorage(token: string, menu: Module[]) {
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
  }

  login(formData: any) {
    return this.http.post(`${base_url}/Login/Authenticate`, formData)
      .pipe(
        tap((resp: any) => {          
          if(resp.Code == 200)
          {
            this.saveLocalStorage(resp.Object.Token, resp.Object.Modules);
          }
        })
      );
  }
}
