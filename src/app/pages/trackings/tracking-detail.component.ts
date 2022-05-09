import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { ModalEventService } from 'src/app/services/modal-event.service';
import { ModalTrackingService } from 'src/app/services/modal-tracking.service';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrls: ['./tracking-detail.component.scss']
})
export class TrackingDetailComponent implements OnInit {

  public loading: boolean = false;
  public operationSelected: any;
  public printButtonOptions: any;
  public refreshButtonOptions: any;
  public backButtonOptions: any;

  public carrierName: string = '';
  public serviceRequestCode: string = '';

  public orderObj: any;
  public conditions: any = [];
  public radioGroupValue: any;

  // Details
  public files: any = [];
  public itinerarys: any = [];
  public containers: any = [];
  public packages: any = [];

  // Label
  public departureOrArrivalLabel: string = '';
  public numberFlightLabel: string = '';

  // Hidden Controls
  public hiddenControls: boolean = false;

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalTrackingService: ModalTrackingService,
    public modalEventService: ModalEventService
  ) {

    this.backButtonOptions = {
      type: 'back',
      onClick: () => {
        //notify('Back Operations');
        return this.router.navigateByUrl('/dashboard/trackings');
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
      .subscribe(({ id }) => {

        this.activatedRoute.queryParamMap
          .subscribe((params) => {
            this.orderObj = { ...params.keys, ...params };
            const { entity, system } = this.orderObj.params;
            // console.log(entity);
            // console.log(system);
            this.loadOperation(id, entity, system);
          }
          );

      });
  }

  loadOperation(id: number, entity: number, system: string) {
    this.loading = true;

    this.trackingService.getOperation(system, entity, id)
      .subscribe((resp: any) => {
        this.loading = false;
        // console.log(resp);
        if (resp.Code == eHttpStatusCode.OK) {

          this.operationSelected = resp.Object;

          // Header
          this.carrierName = resp.Object.CARRIERNAME;
          this.serviceRequestCode = resp.Object.SERVICEREQUESTCODE;

          // RadioGroup
          this.conditions = ["FCL", "LCL"];

          if (resp.Object.BIT_ISFCL) {
            this.radioGroupValue = "FCL";
          }

          if (resp.Object.BIT_ISLCL) {
            this.radioGroupValue = "LCL";
          }

          // Labels
          if (resp.Object.VCH_WAY == "AEREA") {
            this.departureOrArrivalLabel = "Aeropuerto";
            this.numberFlightLabel = "Nro Vuelo";
            this.hiddenControls = false;
          }
          else {
            this.departureOrArrivalLabel = "Puerto";
            this.numberFlightLabel = "Nro Viaje";
            this.hiddenControls = true;
          }

          // Details
          this.files = resp.Object.TBL_SLI_SHIPMENTDOCUMENTFILE || [];
          this.itinerarys = resp.Object.TBL_SLI_SHIPMENTDOCUMENTITINERARY || [];
          this.containers = resp.Object.TBL_SLI_SHIPMENTDOCUMENTCONTAINER || [];
          this.packages = resp.Object.TBL_SLI_SHIPMENTDOCUMENTPACKAGE || [];
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

  showFile(e: any) {
    const pathFull = e.row.data.VCH_FILEROUTE;

    window.open(pathFull, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=30,width=1300,height=700");
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
