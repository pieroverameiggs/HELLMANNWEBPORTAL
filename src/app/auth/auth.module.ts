import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DxFormModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { SingleCardModule } from '../layouts';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [    
    LoginComponent, ResetPasswordComponent, ChangePasswordComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    DxFormModule,
    SingleCardModule,
    DxLoadIndicatorModule,
    ComponentsModule
  ]
})
export class AuthModule { }
