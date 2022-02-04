import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadIndicatorComponent } from './load-indicator/load-indicator.component';
import { DxLoadIndicatorModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    LoadIndicatorComponent
  ],
  exports: [
    LoadIndicatorComponent
  ],
  imports: [
    CommonModule,
    DxLoadIndicatorModule
  ]
})
export class ComponentsModule { }
