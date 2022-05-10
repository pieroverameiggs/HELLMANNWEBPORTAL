import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalEventService } from 'src/app/services/modal-event.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-trackingevent',
  templateUrl: './trackingevent.component.html',
  styleUrls: ['./trackingevent.component.scss']
})
export class TrackingeventComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: any;
  public detailButtonOptions: any;

  constructor(
    public modalEventService: ModalEventService,
    private router: Router
  ) {

    this.detailButtonOptions = {
      icon: 'fas fa-search-plus',
      text: 'Ver Más',
      onClick(e: any) {
        console.log(e);
      },
    };

  }

  ngOnInit(): void {
  }

  popup_hiding(e: any) {
    this.modalEventService.hideModal();
  }

  showDetail(id: number, entity: number, system: string, table: string) {
    this.modalEventService.showLoading();
    this.modalEventService.hideModal();
    if (table == 'OPE')
      this.router.navigate(['/dashboard/operation/' + id], { queryParams: { system, entity } });
    else if (table == 'CUSTOMS')
      this.router.navigate(['/dashboard/customs/' + id], { queryParams: { system, entity } });
  }

  exportTrackingHellmann(e: any) {
    // console.log(this.dataGrid.instance);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Trackings');

    worksheet.columns = [
      { width: 5 }, { width: 20 }, { width: 30 }, { width: 40 }, { width: 20 }
    ];

    exportDataGrid({
      component: e.component,
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

}
