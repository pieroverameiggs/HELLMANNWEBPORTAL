import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url_apimaintenace;

@Injectable({
  providedIn: 'root'
})
export class GenericService {

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

  searchGenericByTableName(tableName: string) {
    const url = `${base_url}/Generic/GetByTableName?tableName=${tableName}`;
    return this.http.get(url);
  }
}
