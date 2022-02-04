import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavOuterToolbarModule } from '../layouts';
import { FooterModule } from '../shared/components';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent    
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SideNavOuterToolbarModule,
    FooterModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
