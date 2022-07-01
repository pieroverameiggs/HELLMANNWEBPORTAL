import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { ModalEventService } from 'src/app/services/modal-event.service';
import { ModalTrackingService } from 'src/app/services/modal-tracking.service';
import { TabService } from 'src/app/services/tab.service';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-customs-detail',
  templateUrl: './customs-detail.component.html',
  styleUrls: ['./customs-detail.component.scss']
})
export class CustomsDetailComponent implements OnInit {

  public loading: boolean = false;
  public customsSelected: any;
  public printButtonOptions: any;
  public refreshButtonOptions: any;
  public backButtonOptions: any;

  public carrierName: string = '';
  public serviceRequestCode: string = '';

  public orderObj: any;

  // Details
  public files: any = [];
  public containers: any = [];

  // Hidden Controls
  public hiddenControls: boolean = false;

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalTrackingService: ModalTrackingService,
    public tabService: TabService,
    private modalEventService: ModalEventService
  ) {

    this.backButtonOptions = {
      type: 'back',
      onClick: () => {
        //notify('Back Operations');
        //return this.router.navigateByUrl('/dashboard/trackings');
        this.tabService.tabSelected('Seguimiento');
      },
    };

    this.printButtonOptions = {
      icon: 'print',
      onClick: () => {
        // console.log('Print Operation');
        window.print();
      },
    };

    this.refreshButtonOptions = {
      icon: 'refresh',
      onClick: () => {
        // console.log('Refresh Operation');
        window.location.reload();
      },
    };

  }

  ngOnInit(): void {
    this.modalTrackingService.hideLoading();
    this.modalEventService.hideLoading();

    this.activatedRoute.params
      .subscribe(({ id, entity, system }) => {

        if (entity && system)
          this.loadCustoms(id, entity, system);

        // this.activatedRoute.queryParamMap
        //   .subscribe((params) => {
        //     this.orderObj = { ...params.keys, ...params };
        //     const { entity, system } = this.orderObj.params;
        //     // console.log(entity);
        //     // console.log(system);
        //     if(entity && system)
        //       this.loadCustoms(id, entity, system);
        //   }
        //   );

      });
  }

  loadCustoms(id: number, entity: number, system: string) {
    this.loading = true;

    this.trackingService.getCustoms(system, entity, id)
      .subscribe((resp: any) => {
        this.loading = false;
        // console.log(resp);
        if (resp.Code == eHttpStatusCode.OK) {

          this.customsSelected = resp.Object;

          // Header
          this.carrierName = resp.Object.CARRIERNAME;
          this.serviceRequestCode = resp.Object.SERVICEREQUESTCODE;

          // Labels
          if (resp.Object.VCH_WAY == "AEREA") {
            this.hiddenControls = false;
          }
          else {
            this.hiddenControls = true;
          }

          // Details
          this.files = resp.Object.TBL_SLI_SHIPMENTDOCUMENTCUSTOMSFILE || [];
          this.containers = resp.Object.TBL_SLI_SHIPMENTDOCUMENTCUSTOMSCONTAINER || [];
        }
        else {
          this.showNotify(resp.Message, 'error');
        }

      }, (err) => {
        this.loading = false;
        if (err.status == eHttpStatusCode.UNAUTHORIZED) {
          this.router.navigateByUrl('/login');
        }
        else {
          this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
        }
      });
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
