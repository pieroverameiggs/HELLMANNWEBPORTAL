import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { TrackingEvent } from '../interfaces/tracking-event.interface';
import { TrackingModal } from '../interfaces/tracking-modal.interface';
import { TrackingWin } from '../interfaces/tracking-win.interface';
import { eHttpStatusCode } from '../model/enums.model';
import { TrackingService } from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class ModalEventService {

  public popupEventVisible: boolean = false;
  public trackingModal: TrackingModal[] = [];
  public trackingModalSelect: TrackingModal = {} as TrackingModal;
  public filter:any;

  public loading: boolean = false;
  public origin: string = 'Sin Origin';
  public destination: string = 'Sin Destino';
  public way: string = '';

  public shipmentDocumentId: number = 0;
  public system: string = '';
  public table: string = '';
  public entity: number = 0;

  // Win
  public trackingWin: TrackingWin[] = [];
  public trackingContainersWin: any;
  public airSeaPortLabel: string = '';
  public transportSeaPortLabel: string = '';
  public serviceRequestId: number = 0;

  // Hellmann
  public tracking: TrackingEvent[] = [];
  public trackingSelect: any;

  constructor(
    private trackingService: TrackingService,
    private router: Router
  ) { }

  showModal(filter: any) {
    this.popupEventVisible = true;
    this.origin = filter.VCH_ORIGIN;
    this.destination = filter.VCH_DESTINATION;
    this.way = filter.VHC_WAY;

    this.shipmentDocumentId = filter.shipmentDocumentId;
    this.system = filter.VCH_SYSTEM;
    this.table = filter.VCH_TABLE;
    this.entity = filter.ENTITYID;

    // Win
    this.airSeaPortLabel = filter.VHC_WAY == "AEREA" ? "Aeropuerto" : "Puerto";  
    this.transportSeaPortLabel = filter.VHC_WAY == "AEREA" ? "Nro Vuelo" : "Nro Viaje";    
    this.serviceRequestId = filter.serviceRequestId;

    this.filter = filter;

    this.getLoadTrackingLine(filter);    
    this.getLoadTrackingWin(filter);
    this.getLoadTrackingHellmann(filter);
  }

  getLoadTrackingLine(filter: any) {
    this.trackingService.getTrackingEvent(filter.VCH_SYSTEM, filter.shipmentDocumentId)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {
          this.trackingModal = resp.List;
          this.trackingModalSelect = resp.List.find((item: any) => (item.CHR_STATE == 'C' || item.CHR_STATE == 'T'))
        }
      }, (err) => {
        if (err.status == eHttpStatusCode.UNAUTHORIZED) {
          this.router.navigateByUrl('/login');
        }
        else {
          this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
        }
      });
  }

  getLoadTrackingWin(filter: any) {
    this.trackingService.getTrackingIntegrationWin(filter.VCH_SYSTEM, filter.serviceRequestId)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {          
          this.trackingWin = resp.List;
          
          let dataContainersDistinct:any = [];
          
          resp.List.forEach((dataContainer:any)=>{
            if(!dataContainersDistinct.find((item:any) => (item.VCH_SEARCHVALUEWIN==dataContainer.VCH_SEARCHVALUEWIN)))
            {
              dataContainersDistinct.push({
                INT_SERVICEREQUESTID: dataContainer.INT_SERVICEREQUESTID,
                VCH_SEARCHVALUEWIN: dataContainer.VCH_SEARCHVALUEWIN                
              });
            }
          });
          
          //console.log(dataContainersDistinct);
          this.trackingContainersWin = dataContainersDistinct;
        }
      }, (err) => {
        if (err.status == eHttpStatusCode.UNAUTHORIZED) {
          this.router.navigateByUrl('/login');
        }
        else {
          this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
        }
      });  
  }

  getLoadTrackingHellmann(filter:any){
    this.trackingService.getTracking(filter.VCH_SYSTEM, filter.VCH_TABLE, filter.shipmentDocumentId)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {

          let cont = 0;
          const selectTracking = resp.List.filter((item: any, index: number) => {

            if (item.DAT_ACTUALDATE)
              cont = cont + 1;

            return item.DAT_ACTUALDATE && cont === 1;
          });
          // debugger;
          // console.log(selectTracking);
          if (selectTracking.length > 0)
            this.trackingSelect = selectTracking[0];
          else
            this.trackingSelect = { INT_IDEVENTTRACKING: 0 };

          this.tracking = resp.List;          
          
          // console.log(this.tracking);
        }
      }, (err) => {
        if (err.status == eHttpStatusCode.UNAUTHORIZED) {
          this.router.navigateByUrl('/login');
        }
        else {
          this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
        }
      });
  }

  hideModal() {
    this.popupEventVisible = false;
    this.trackingModal = [];
    this.trackingModalSelect = {} as TrackingModal;
  }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;    
  }

  showNotify(msg: string, type: string) {
    notify({
      message: msg,
      width: 500,
      // shading: true,
      position: {
        my: 'center top',
        at: 'center top',
      },
    }, type, 8000);
  }

  onlyUnique(value:any, index:any, self:any){
    return self.indexOf(value) == index;
  }
}
