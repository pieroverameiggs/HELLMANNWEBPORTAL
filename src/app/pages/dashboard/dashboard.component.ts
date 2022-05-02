import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/interfaces/entity.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public urlReport: string = '';
  public entityCurrent: Entity = {} as Entity;
  public filter: string = '';
  
  constructor() { 

    this.entityCurrent = JSON.parse(localStorage.getItem('entity') || '{}');

    //this.urlReport = 'https://app.powerbi.com/view?r=eyJrIjoiMmRmMzVhOGItZjBjZS00MjQ3LWE0ZjgtYmQxMWRhYTVlOThiIiwidCI6IjZlMjI5NzZhLWIyMzYtNGFjMC1iNDc4LTNkYTZhYWM0YzA0MiJ9&pageName=ReportSection';
    if(this.entityCurrent){
      if (this.entityCurrent.INT_IDENTITY != 0) {
        this.filter = `&$filter=TBL_DATAW_SHIPMENTDOCUMENT_CUSTOMERPORTAL/INT_CUSTOMERENTITYID eq ${this.entityCurrent.INT_IDENTITY}`
      }
    }

    // debugger;

    this.urlReport = `https://app.powerbi.com/reportEmbed?reportId=f10b879b-edae-4025-9f28-0af87da0af53&autoAuth=true&pageName=ReportSection${this.filter}`
  }

  ngOnInit(): void {
  }

}
