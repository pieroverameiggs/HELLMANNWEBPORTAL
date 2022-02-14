import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { FileHellData } from '../interfaces/file-helldata.interface';
import { eHttpStatusCode } from '../model/enums.model';
import { TrackingService } from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class ModalHelldataService {

  public popupHellDataVisible: boolean = false;
  public files: FileHellData[] = [];

  constructor(
    private trackingService: TrackingService,
    private router: Router,
  ) { }

  showModal(filter: any){
    this.popupHellDataVisible = true;

    this.trackingService.getHellData(filter.VCH_SYSTEM, filter.ENTITYID, filter.shipmentDocumentId)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {
          this.files = resp.List;
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

  hideModal(){
    this.popupHellDataVisible = false;
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
