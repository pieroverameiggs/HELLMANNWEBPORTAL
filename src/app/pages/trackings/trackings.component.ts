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

  constructor(
    private trackingService: TrackingService,
    private genericService: GenericService
  ) {
    this.showTracking = this.showTracking.bind(this);
    this.downloadHellData = this.downloadHellData.bind(this);

    this.filters.WAYID = 0;
    this.filters.REGIMEID = 0;
    this.filters.ENTITYID = 5152;
    this.filters.CRITERIA = '';
    this.filters.STARTDATE = this.dateWithMonthsDelay(-1);
    this.filters.ENDDATE = this.dateWithMonthsDelay(0);
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
      .subscribe((loadGenerics:any) => {        
        if(loadGenerics.Code == eHttpStatusCode.OK){
          this.wayList = loadGenerics.List;
        }        
      }, error => {
        console.log(error);
      });
  }

  getLoadRegime() {
    this.genericService.searchGenericByTableName(eGenericTableName.regime)
      .subscribe((loadGenerics:any) => {
        if(loadGenerics.Code == eHttpStatusCode.OK){
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
      { width: 5 }, { width: 15 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 20 }
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

    console.log(this.filters);

    this.trackingService.getOperations(this.filters)
      .subscribe((resp: any) => {
        if (resp.Code == eHttpStatusCode.OK) {
          this.trackings = resp.Object.OperationResponse;
        }
        else {
          notify(resp.Message, 'error', 5000);
        }
      });
  }

  refreshDataGrid(e: Event) {
    this.dataGrid.instance.refresh();
  }

  showTracking() {

  }

  downloadHellData() {

  }

}
