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
import { DxAccordionModule, DxAutocompleteModule, DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSwitchModule, DxTabPanelModule, DxTextBoxModule, DxToolbarModule,DxTooltipModule } from 'devextreme-angular';
import { TrackingwinComponent } from './popups/trackingwin/trackingwin.component';
import { TrackingComponent } from './popups/tracking/tracking.component';
import { HelldataComponent } from './popups/helldata/helldata.component';
import { TrackingDetailComponent } from './trackings/tracking-detail.component';
import { CustomsDetailComponent } from './trackings/customs-detail.component';
import { NotifyComponent } from './settings/notify.component';
import { ProfileComponent } from './profile/profile.component';
import { TrackingeventComponent } from './popups/trackingevent/trackingevent.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    TrackingsComponent,
    TrackingComponent,
    HelldataComponent,
    TrackingDetailComponent,
    CustomsDetailComponent,
    NotifyComponent,
    ProfileComponent,
    TrackingwinComponent,
    TrackingeventComponent    
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
    DxAutocompleteModule,
    DxSwitchModule,
    DxTooltipModule
  ]
})
export class PagesModule { }
