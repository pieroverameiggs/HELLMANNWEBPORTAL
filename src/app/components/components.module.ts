import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadIndicatorComponent } from './load-indicator/load-indicator.component';
import { DxDataGridModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { GridHelldataComponent } from './grid-helldata/grid-helldata.component';



@NgModule({
  declarations: [
    LoadIndicatorComponent,
    GridHelldataComponent
  ],
  exports: [
    LoadIndicatorComponent,
    GridHelldataComponent
  ],
  imports: [
    CommonModule,
    DxLoadIndicatorModule,
    DxDataGridModule
  ]
})
export class ComponentsModule { }
