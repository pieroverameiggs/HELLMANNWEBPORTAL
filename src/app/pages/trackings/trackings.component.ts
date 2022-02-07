import { Component, OnInit } from '@angular/core';
import { TrackingCriteria } from 'src/app/interfaces/tracking-criteria.interface';
import { Tracking } from 'src/app/interfaces/tracking.interface';

@Component({
  selector: 'app-trackings',
  templateUrl: './trackings.component.html',
  styleUrls: ['./trackings.component.scss']
})
export class TrackingsComponent implements OnInit {

  public loading: boolean = false;
  public filters: TrackingCriteria = {} as TrackingCriteria;
  public trackings: Tracking[] = [
    {
      INT_SHIPMENTDOCUMENTID: 1,
      VCH_SHIPMENTDOCUMENTSERIE: '2022',
      VCH_SHIPMENTDOCUMENTNUMBER: 'Z01SZT2112020B',
      VCH_REQUESTCODE: 'ROSI202103718',
      VCH_QUOTATIONCODE: 'OQRI-M-2021-00594',
      VCH_SHIPMENTNUMBER: '2022-00022',
      DAT_DATECREATE: new Date()
    },
    {
      INT_SHIPMENTDOCUMENTID: 2,
      VCH_SHIPMENTDOCUMENTSERIE: '2022',
      VCH_SHIPMENTDOCUMENTNUMBER: 'BKKCLLL05483',
      VCH_REQUESTCODE: 'ROSI202103320',
      VCH_QUOTATIONCODE: 'OQRI-M-2022-00203',
      VCH_SHIPMENTNUMBER: '2022-00121',
      DAT_DATECREATE: new Date()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  exportTrackings(e: Event) {
    
  }

  searchTrackings(e: Event) {

  }

  refreshDataGrid(e: Event) {

  }

  showTracking() {

  }

  downloadHellData() {

  }

}
