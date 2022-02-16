import { Component, OnInit, ViewChild } from '@angular/core';

//Interface
import { TrackingCriteria } from 'src/app/interfaces/tracking-criteria.interface';
import { Tracking } from 'src/app/interfaces/tracking.interface';

// Utilities
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridComponent } from 'devextreme-angular';
import { TrackingService } from 'src/app/services/tracking.service';
import notify from 'devextreme/ui/notify';
import { Generic } from 'src/app/interfaces/generic.interface';
import { GenericService } from 'src/app/services/generic.service';
import { eGenericTableName, eHttpStatusCode } from 'src/app/model/enums.model';
import { Router } from '@angular/router';
import { Entity } from 'src/app/interfaces/entity.interface';
import { ModalHelldataService } from 'src/app/services/modal-helldata.service';
import { ModalTrackingService } from 'src/app/services/modal-tracking.service';

@Component({
  selector: 'app-trackings',
  templateUrl: './trackings.component.html',
  styleUrls: ['./trackings.component.scss']
})
export class TrackingsComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: any;

  public loading: boolean = false;
  public filters: TrackingCriteria = {} as TrackingCriteria;
  public trackings: Tracking[] = [];
  public wayList: Generic[] = [];
  public regimeList: Generic[] = [];
  public entityList: Entity[] = [];
  public maxEndDate: Date = new Date();
  public maxStartDate: Date = new Date();

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private genericService: GenericService,
    private modalHelldataService: ModalHelldataService,
    private modalTrackingService: ModalTrackingService
  ) {
    this.showTracking = this.showTracking.bind(this);
    this.showHellData = this.showHellData.bind(this);
    this.onValueChangedStartDate = this.onValueChangedStartDate.bind(this);

    this.filters.WAYID = 0;
    this.filters.REGIMEID = 0;
    // this.filters.ENTITYID = 5152;
    // this.filters.CRITERIA = 'GOSZX21101172';
    this.filters.CRITERIA = 'CD110029412';
    this.filters.STARTDATE = this.dateWithMonthsDelay(-1);
    this.filters.ENDDATE = this.dateWithMonthsDelay(0);

    this.entityList = JSON.parse(localStorage.getItem('groupEntity') || '[]');
  }

  dateWithMonthsDelay(months: number) {
    const date = new Date();
    date.setMonth(date.getMonth() + months)

    return date
  }

  ngOnInit(): void {
    this.getLoadWay();
    this.getLoadRegime();
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

  getLoadRegime() {
    this.genericService.searchGenericByTableName(eGenericTableName.regime)
      .subscribe((loadGenerics: any) => {
        if (loadGenerics.Code == eHttpStatusCode.OK) {
          this.regimeList = loadGenerics.List;
        }
      }, error => {
        console.log(error);
      });
  }

  exportTrackings(e: any) {
    // console.log(this.dataGrid.instance);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Trackings');

    worksheet.columns = [
      { width: 5 }, { width: 20 }, { width: 20 }, { width: 10 }, { width: 20 }, { width: 25 }, { width: 25 }, { width: 20 }, { width: 20 }
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
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Trackings.xlsx');
      });
    });
    e.cancel = true;
  }

  searchTrackings(e: any) {

    this.loading = true;
    // console.log(this.filters);

    this.trackingService.getOperations(this.filters)
      .subscribe((resp: any) => {
        this.loading = false;
        if (resp.Code == eHttpStatusCode.OK) {
          this.trackings = resp.Object.OperationResponse;
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

  refreshDataGrid(e: Event) {
    this.dataGrid.instance.refresh();
  }

  showTracking(e: any) {
    //console.log(e);
    // e.row.key

    const filter = {
      VCH_SYSTEM: e.row.data.VCH_SYSTEM,
      VCH_ORIGIN: e.row.data.VCH_ORIGIN,
      VCH_DESTINATION: e.row.data.VCH_DESTINATION,
      VHC_WAY: e.row.data.VHC_WAY,
      ENTITYID: this.filters.ENTITYID,
      shipmentDocumentId: e.row.key
    }    

    this.modalTrackingService.showModal(filter);
  }

  showHellData(e: any) {
    // console.log(e);
    // e.row.key

    const filter = {
      VCH_SYSTEM: e.row.data.VCH_SYSTEM,
      ENTITYID: this.filters.ENTITYID,
      shipmentDocumentId: e.row.key
    }    

    this.modalHelldataService.showModal(filter);
  }  

  onValueChangedStartDate(e: any) {
    // console.log(e.previousValue);
    // console.log(e.value);    
  }

  onValueChangedEndDate(e: any) {
    // console.log(e.previousValue);
    // console.log(e.value);        
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
