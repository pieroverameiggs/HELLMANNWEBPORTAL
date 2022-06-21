import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { TrackingModal } from 'src/app/interfaces/tracking-modal.interface';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  public trackingModalTL: TrackingModal[] = [];
  public trackingModalSelectTL: TrackingModal = {} as TrackingModal;

  //@Input() trackingModalTL: TrackingModal[] = [];
  //@Input() trackingModalSelectTL: TrackingModal = {} as TrackingModal
  @Input() way: string = '';
  @Input() filter: any;
  @Input() searchValue: string = '';

  constructor(
    private trackingService: TrackingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLoadTrackingLine(this.filter);
  }

  getLoadTrackingLine(filter: any) {
    debugger;
    if (this.searchValue.length==0) {
      this.trackingService.getTrackingEvent(filter.VCH_SYSTEM, filter.shipmentDocumentId)
        .subscribe((resp: any) => {
          if (resp.Code == eHttpStatusCode.OK) {
            this.trackingModalTL = resp.List;
            this.trackingModalSelectTL = resp.List.find((item: any) => (item.CHR_STATE == 'C' || item.CHR_STATE == 'T'))
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
    else{
      this.trackingService.getTrackingEventWin(filter.VCH_SYSTEM, filter.serviceRequestId, this.searchValue)
        .subscribe((resp: any) => {
          if (resp.Code == eHttpStatusCode.OK) {
            this.trackingModalTL = resp.List;
            this.trackingModalSelectTL = resp.List.find((item: any) => (item.CHR_STATE == 'C' || item.CHR_STATE == 'T'))
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
