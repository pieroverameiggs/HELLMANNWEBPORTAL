import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { TrackingWin } from '../interfaces/tracking-win.interface';
import { eHttpStatusCode } from '../model/enums.model';
import { TrackingService } from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class ModalWinService {

  public popupWinVisible: boolean = false;
  public trackingWin: TrackingWin[] = [];

  // Labels
  public airSeaPortLabel: string = '';
  public transportSeaPortLabel: string = '';

  public serviceRequestId: number = 0;
  public system: string = '';

  constructor(
    private trackingService: TrackingService,
    private router: Router,
  ) { }

  showModal(filter: any) {
    this.popupWinVisible = true;
    this.airSeaPortLabel = filter.VHC_WAY == "AEREA" ? "Aeropuerto" : "Puerto";  
    this.transportSeaPortLabel = filter.VHC_WAY == "AEREA" ? "Nro Vuelo" : "Nro Viaje";    

    this.serviceRequestId = filter.serviceRequestId;
    this.system = filter.VCH_SYSTEM;

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
    this.popupWinVisible = false;
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
