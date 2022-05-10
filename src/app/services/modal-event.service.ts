import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
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
  public airSeaPortLabel: string = '';
  public transportSeaPortLabel: string = '';

  public serviceRequestId: number = 0;

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

    this.getLoadTrackingLine(filter);
    this.getLoadTrackingWin(filter);
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
}
