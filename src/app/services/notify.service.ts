import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url_apicustomer;

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  saveNotifications(request: any) {
    return this.http.post(`${base_url}/Notify/Save`, request, this.headers);
  }

  getNotifications(wayId: number, entityId: number, userId: number, criteria: string) {
    return this.http.get(`${base_url}/Notify/GetListNotifyByUserId?wayId=${wayId}&entityId=${entityId}&userId=${userId}&criteria=${criteria}`, this.headers);
  }

  getUsers(entityId: number){
    return this.http.get(`${base_url}/Notify/GetUsersByEntityId?entityId=${entityId}`, this.headers);    
  }
}
