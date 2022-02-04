import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent    
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
