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
import { DxAccordionModule, DxAutocompleteModule, DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxTabPanelModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { TrackingComponent } from './popups/tracking/tracking.component';
import { HelldataComponent } from './popups/helldata/helldata.component';
import { TrackingDetailComponent } from './trackings/tracking-detail.component';
import { CustomsDetailComponent } from './trackings/customs-detail.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    TrackingsComponent,
    TrackingComponent,
    HelldataComponent,
    TrackingDetailComponent,
    CustomsDetailComponent    
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
    DxPopupModule,
    DxScrollViewModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxRadioGroupModule,
    DxTabPanelModule,
    DxAutocompleteModule
  ]
})
export class PagesModule { }
