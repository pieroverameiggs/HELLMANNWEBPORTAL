import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public urlReport: string = '';
  
  constructor() { 
    this.urlReport = 'https://app.powerbi.com/view?r=eyJrIjoiMmRmMzVhOGItZjBjZS00MjQ3LWE0ZjgtYmQxMWRhYTVlOThiIiwidCI6IjZlMjI5NzZhLWIyMzYtNGFjMC1iNDc4LTNkYTZhYWM0YzA0MiJ9&pageName=ReportSection';
  }

  ngOnInit(): void {
  }

}
