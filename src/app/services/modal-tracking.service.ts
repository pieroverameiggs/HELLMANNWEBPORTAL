import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { TrackingEvent } from '../interfaces/tracking-event.interface';
import { eHttpStatusCode } from '../model/enums.model';
import { TrackingService } from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class ModalTrackingService {

  public popupVisible: boolean = false;
  public tracking: TrackingEvent[] = [];
  public origin: string = 'Sin Origin';
  public destination: string = 'Sin Destino';
  public way: string = '';
  public shipmentDocumentId: number = 0;

  constructor(
    private trackingService: TrackingService,
    private router: Router
  ) { }

  showModal(filter: any) {
    this.popupVisible = true;
    this.origin = filter.VCH_ORIGIN;
    this.destination = filter.VCH_DESTINATION;
    this.way = filter.VHC_WAY;
    this.shipmentDocumentId = filter.shipmentDocumentId;

    this.trackingService.getTracking(filter.VCH_SYSTEM, filter.shipmentDocumentId)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {
          this.tracking = resp.List;
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
    this.popupVisible = false;
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
