import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Entity } from 'src/app/interfaces/entity.interface';
import { Generic } from 'src/app/interfaces/generic.interface';
import { NotifyCriteria } from 'src/app/interfaces/notify-criteria.interface';
import { Notify } from 'src/app/interfaces/notify.interface';
import { eGenericTableName, eHttpStatusCode } from 'src/app/model/enums.model';
import { GenericService } from 'src/app/services/generic.service';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: any;

  public loading: boolean = false;
  public filters: NotifyCriteria = {} as NotifyCriteria;
  public notifys: Notify[] = [
    {
      INT_TRACKINGNOTIFICATIONID: 0,
      INT_ENTITYID: 5152,
      INT_IDGROUPDATE: 425,
      INT_IDTRACKINGDATE: 44,
      INT_WAYID: 1,
      VCH_WAY: 'AEREA',
      VCH_GROUPNAME: 'WAREHOUSE',
      VCH_ENGLISHDESCRIPTION: 'Billing notice',
      VCH_SPANISHDESCRIPTION: 'Aviso de facturacion',
      VCH_NAMEDATE: 'AVISO DE FACTURACION '
    }
  ];
  public wayList: Generic[] = [];
  public entityList: Entity[] = [];
  public selectedRows: number[] = [];

  public visibleAutocompleteEntity: boolean = false;
  public entityCurrent: Entity = {} as Entity;
  public entityAutocomplete: Generic[] = [];

  constructor(
    private genericService: GenericService,
    private trackingService: TrackingService
  ) {
    this.onValueChangedEntity = this.onValueChangedEntity.bind(this);
    this.onSelectionChangedEntity = this.onSelectionChangedEntity.bind(this);
    // this.saveNotifys = this.saveNotifys.bind(this);

    this.filters.WAYID = 0;
    this.filters.CRITERIA = '';

    this.entityList = JSON.parse(localStorage.getItem('groupEntity') || '[]');
    this.entityCurrent = JSON.parse(localStorage.getItem('entity') || '{}');
    if (this.entityCurrent) {
      if (this.entityCurrent.INT_IDENTITY == 0) {
        this.visibleAutocompleteEntity = true;
        this.filters.ENTITYID = 0;
      }
    }
  }

  ngOnInit(): void {
    this.getLoadWay();
  }

  getLoadWay() {
    this.genericService.searchGenericByTableName(eGenericTableName.way)
      .subscribe((loadGenerics: any) => {
        if (loadGenerics.Code == eHttpStatusCode.OK) {
          this.wayList = loadGenerics.List;
        }
      }, error => {
        console.log(error);
      });
  }

  onValueChangedEntity(e: any) {
    // console.log(e);

    const description = e.value;

    if (description) {
      if (description.length > 3) {
        this.trackingService.getEntitys(description)
          .subscribe((resp: any) => {
            // console.log(resp);
            if (resp.Code == eHttpStatusCode.OK) {
              this.entityAutocomplete = resp.List;
            }
          });
      }
      else
        this.filters.ENTITYID = 0;
    }
    else
      this.filters.ENTITYID = 0;
  }

  onSelectionChangedEntity(e: any) {
    // console.log(e);

    if (e.selectedItem) {
      if (e.selectedItem.INT_VALUEFIELD != 0) {
        this.filters.ENTITYID = e.selectedItem.INT_VALUEFIELD;
      }
    }
  }

  searchNotifys(e: any) {

  }

  exportNotifys(e: any) {

  }

  refreshDataGrid(e: any) {

  }

  saveNotifys(e: any) {
    // console.log(e);
    console.log(this.selectedRows);
  }

}
