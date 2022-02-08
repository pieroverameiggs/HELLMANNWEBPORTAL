import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavOuterToolbarModule } from '../layouts';
import { FooterModule } from '../shared/components';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { TrackingsComponent } from './trackings/trackings.component';
import { DxAccordionModule, DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    TrackingsComponent    
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SideNavOuterToolbarModule,
    FooterModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    DxAccordionModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class PagesModule { }
