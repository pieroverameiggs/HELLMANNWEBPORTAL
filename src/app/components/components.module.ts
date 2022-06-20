import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadIndicatorComponent } from './load-indicator/load-indicator.component';
import { DxDataGridModule, DxLoadIndicatorModule, DxTooltipModule } from 'devextreme-angular';
import { GridHelldataComponent } from './grid-helldata/grid-helldata.component';
import { TimelineComponent } from './timeline/timeline.component';
import { GrigWinComponent } from './grig-win/grig-win.component';



@NgModule({
  declarations: [
    LoadIndicatorComponent,
    GridHelldataComponent,
    TimelineComponent,
    GrigWinComponent
  ],
  exports: [
    LoadIndicatorComponent,
    GridHelldataComponent,
    TimelineComponent,
    GrigWinComponent
  ],
  imports: [
    CommonModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxTooltipModule
  ]
})
export class ComponentsModule { }
