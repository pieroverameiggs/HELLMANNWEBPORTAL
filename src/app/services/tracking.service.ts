import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrackingCriteria } from '../interfaces/tracking-criteria.interface';

const base_url = environment.base_url_apicustomer;

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(
    private http: HttpClient,
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

  getOperations(request: TrackingCriteria) {
    return this.http.post(`${base_url}/Operation/GetListForGrid`, request, this.headers);
  }

  getHellData(system: string, entityId: number, shipmentDocumentId: number) {
    return this.http.get(`${base_url}/Operation/GetListHellDataById?system=${system}&entityId=${entityId}&shipmentDocumentId=${shipmentDocumentId}`, this.headers);
  }

  getTracking(system: string, shipmentDocumentId: number) {
    return this.http.get(`${base_url}/Operation/GetListTrackingById?system=${system}&shipmentDocumentId=${shipmentDocumentId}`, this.headers);
  }
}