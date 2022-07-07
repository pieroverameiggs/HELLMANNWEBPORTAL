import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrackingCriteria } from '../interfaces/tracking-criteria.interface';

const base_url = environment.base_url_apicustomer;
const base_url_maintenace = environment.base_url_apimaintenace;

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

  getHellData(system: string, table: string, entityId: number, shipmentDocumentId: number) {
    return this.http.get(`${base_url}/Operation/GetListHellDataById?system=${system}&table=${table}&entityId=${entityId}&shipmentDocumentId=${shipmentDocumentId}`, this.headers);
  }

  getTracking(system: string, table:string, registerId: number) {
    return this.http.get(`${base_url}/Operation/GetListTrackingById?system=${system}&table=${table}&registerId=${registerId}`, this.headers);
  }

  getTrackingEvent(system: string, shipmentDocumentId: number) {
    return this.http.get(`${base_url}/Operation/GetListTrackingEventBySystem?system=${system}&shipmentDocumentId=${shipmentDocumentId}`, this.headers);
  }

  getTrackingEventWin(system: string, serviceRequestId: number, searchValue: string) {
    return this.http.get(`${base_url}/Operation/GetListTrackingEventBySearchValue?system=${system}&serviceRequestId=${serviceRequestId}&searchValue=${searchValue}`, this.headers);
  }

  getTrackingIntegrationWin(system: string, serviceRequestId: number) {
    return this.http.get(`${base_url}/Operation/GetListTrackingWinById?system=${system}&serviceRequestId=${serviceRequestId}`, this.headers);
  }

  getOperation(system: string, entityId: number, shipmentDocumentId: number) {
    return this.http.get(`${base_url}/Operation/GetOperationById?system=${system}&entityId=${entityId}&shipmentDocumentId=${shipmentDocumentId}`, this.headers);
  }

  getCustoms(system: string, entityId: number, shipmentDocumentCustomsId: number) {
    return this.http.get(`${base_url}/Operation/GetCustomsById?system=${system}&entityId=${entityId}&shipmentDocumentCustomsId=${shipmentDocumentCustomsId}`, this.headers);
  }

  getEntitys(description: string) {
    return this.http.get(`${base_url_maintenace}/Entity/GetEntitysListCombo?description=${description}`, this.headers);
  }

}