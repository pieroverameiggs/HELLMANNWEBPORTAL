import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { eHttpStatusCode } from 'src/app/model/enums.model';
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

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        console.log('Print Operation');
      },
    };

    this.refreshButtonOptions = {
      icon: 'refresh',
      onClick: () => {
        console.log('Refresh Operation');
      },
    };

  }

  ngOnInit(): void {

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
        console.log(resp);
        if (resp.Code == eHttpStatusCode.OK) {
          this.operationSelected = resp.Object;
          this.carrierName = resp.Object.CARRIERNAME;
          this.serviceRequestCode = resp.Object.SERVICEREQUESTCODE;
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
