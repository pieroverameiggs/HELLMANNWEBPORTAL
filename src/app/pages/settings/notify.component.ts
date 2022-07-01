import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import notify from 'devextreme/ui/notify';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { Entity } from 'src/app/interfaces/entity.interface';
import { Generic } from 'src/app/interfaces/generic.interface';
import { NotifyCriteria } from 'src/app/interfaces/notify-criteria.interface';
import { Notify } from 'src/app/interfaces/notify.interface';
import { eGenericTableName, eHttpStatusCode } from 'src/app/model/enums.model';
import { GenericService } from 'src/app/services/generic.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TrackingService } from 'src/app/services/tracking.service';
import { custom } from 'devextreme/ui/dialog';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: any;

  public loading: boolean = false;
  public filters: NotifyCriteria = {} as NotifyCriteria;
  public notifys: Notify[] = [];
  public wayList: Generic[] = [];
  public entityList: Entity[] = [];
  public selectedRows: number[] = [];

  public visibleAutocompleteEntity: boolean = false;
  public entityCurrent: Entity = {} as Entity;
  public userCurrent: any;
  public entityAutocomplete: Generic[] = [];
  public users: any;

  constructor(
    private genericService: GenericService,
    private trackingService: TrackingService,
    private notifyService: NotifyService,
    private router: Router,
    public tabService: TabService
  ) {
    this.onValueChangedEntity = this.onValueChangedEntity.bind(this);
    this.onSelectionChangedEntity = this.onSelectionChangedEntity.bind(this);
    // this.saveNotifys = this.saveNotifys.bind(this);

    this.filters.WAYID = 0;
    this.filters.CRITERIA = '';

    this.userCurrent = JSON.parse(localStorage.getItem('user') || '{}');

    this.entityList = JSON.parse(localStorage.getItem('groupEntity') || '[]');
    this.entityCurrent = JSON.parse(localStorage.getItem('entity') || '{}');
    if (this.entityCurrent) {
      if (this.entityCurrent.INT_IDENTITY == 0) {
        this.visibleAutocompleteEntity = true;
        this.filters.ENTITYID = 0;
      }
    }

    //Select Events
    const notifySelected = this.notifys.filter(item => item.INT_TRACKINGNOTIFICATIONID != 0);
    this.selectedRows = notifySelected.map(item => item.INT_IDTRACKINGDATE);
  }

  ngOnInit(): void {
    this.getLoadWay();
  }

  getLoadWay() {
    this.genericService.searchGenericByTableName(eGenericTableName.way)
      .subscribe((loadGenerics: any) => {
        if (loadGenerics.Code == eHttpStatusCode.OK) {
          this.wayList = loadGenerics.List;  
          this.wayList.unshift({
            INT_VALUEFIELD: 0,
            INT_VALUEFIELD2: 0,
            VCH_VALUEFIELD: 'TODOS',
            VCH_DISPLAYFIELD: 'TODOS'
          });
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
      else {
        this.filters.ENTITYID = 0;
        this.getLoadUsersByEntity(0);
      }
    }
    else {
      this.filters.ENTITYID = 0;
      this.getLoadUsersByEntity(0);
    }
  }

  onSelectionChangedEntity(e: any) {
    // console.log(e);

    if (e.selectedItem) {
      if (e.selectedItem.INT_VALUEFIELD != 0) {
        this.filters.ENTITYID = e.selectedItem.INT_VALUEFIELD;
        this.getLoadUsersByEntity(e.selectedItem.INT_VALUEFIELD);
      }
    }
  }

  getLoadUsersByEntity(entityId: number) {
    this.notifyService.getUsers(entityId)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {
          this.users = resp.List;
        }
      }, error => {
        console.log(error);
      });
  }

  searchNotifys(e: any) {

    if (this.filters.ENTITYID == 0 || !this.filters.ENTITYID) {
      this.showNotify("Entidad es Requerido", 'warning', 2000);
      return;
    }

    if ((this.filters.USERID == 0 || !this.filters.USERID) && this.visibleAutocompleteEntity) {
      this.showNotify("Usuario es Requerido", 'warning', 2000);
      return;
    }

    this.loading = true;
    let userIdSend = this.entityCurrent.INT_IDENTITY == 0 ? this.filters.USERID : this.userCurrent.INT_USERID;
    // console.log(this.filters);

    this.notifyService.getNotifications(this.filters.WAYID, this.filters.ENTITYID, userIdSend, this.filters.CRITERIA)
      .subscribe((resp: any) => {
        this.loading = false;
        // console.log(resp);
        if (resp.Code == eHttpStatusCode.OK) {
          this.notifys = resp.List;
          const filterSelected = resp.List.filter((r: any) => r.INT_TRACKINGNOTIFICATIONID != 0);
          this.selectedRows = filterSelected.map((r: any) => r.INT_IDTRACKINGDATE);
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

  exportNotifys(e: any) {
    // console.log(this.dataGrid.instance);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Notifications');

    worksheet.columns = [
      { width: 5 }, { width: 10 }, { width: 20 }, { width: 30 }, { width: 30 }
    ];

    exportDataGrid({
      component: this.dataGrid.instance,
      worksheet,
      keepColumnWidths: false,
      topLeftCell: { row: 2, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        // if (gridCell?.rowType === 'data') {
        //   if (gridCell?.column?.dataField === 'Phone') {
        //     excelCell.value = parseInt(gridCell.value);
        //     excelCell.numFmt = '[<=9999999]###-####;(###) ###-####';
        //   }
        //   if (gridCell?.column?.dataField === 'Website') {
        //     excelCell.value = { text: gridCell.value, hyperlink: gridCell.value };
        //     excelCell.font = { color: { argb: 'FF0000FF' }, underline: true };
        //     excelCell.alignment = { horizontal: 'left' };
        //   }
        // }
        // if (gridCell?.rowType === 'group') {
        //   excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'BEDFE6' } };
        // }
        // if (gridCell?.rowType === 'totalFooter' && excelCell.value) {
        //   excelCell.font.italic = true;
        // }
      },
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Notifications.xlsx');
      });
    });
    e.cancel = true;
  }

  refreshDataGrid(e: Event) {
    this.dataGrid.instance.refresh();
  }

  saveNotifys(e: any) {
    // console.log(e);

    let userIdSend = this.entityCurrent.INT_IDENTITY == 0 ? this.filters.USERID : this.userCurrent.INT_USERID;
    let data;
    this.loading = true;

    if (this.selectedRows.length != 0) {
      data = this.selectedRows.map(item => {
        return {
          INT_ENTITYID: this.filters.ENTITYID,
          INT_USERID: userIdSend,
          INT_WAYID: this.filters.WAYID,
          INT_TRACKINGDATEID: item
        }
      });
    }
    else {
      data = [{
        INT_ENTITYID: this.filters.ENTITYID,
        INT_USERID: userIdSend,
        INT_WAYID: this.filters.WAYID,
        INT_TRACKINGDATEID: 0
      }];
    }

    this.notifyService.saveNotifications(data)
      .subscribe((resp: any) => {
        this.loading = false;
        // console.log(resp);        
        if (resp.Code == eHttpStatusCode.OK) {
          this.showNotify(resp.Message, 'success', 2000);
          this.searchNotifys(null);
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

  clearNotifys(e: any) {
    let myDialog = custom({
      title: "Confirmación de Limpiar Selección",
      messageHtml: "Está ud. seguro(a) de limpiar la selección de eventos?",
      buttons: [
        {
          text: "Si",
          onClick: (e) => {
            return true
          }
        },
        {
          text: "No",
          onClick: (e) => {
            return false
          }
        },
      ]
    });

    myDialog.show().then((dialogResult: any) => {
      if (dialogResult) {
        this.dataGrid.instance.clearSelection()
      }
    });

  }

  showNotify(msg: string, type: string, time: number = 8000) {
    notify({
      message: msg,
      width: 500,
      // shading: true,
      position: {
        my: 'center top',
        at: 'center top',
      },
    }, type, time);

  }

}
