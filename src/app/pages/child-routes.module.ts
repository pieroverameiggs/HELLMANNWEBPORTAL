import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackingDetailComponent } from './trackings/tracking-detail.component';
import { TrackingsComponent } from './trackings/trackings.component';

const childRoutes: Routes = [

  //Dashboard
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },

  //Seguimiento
  { path: 'trackings', canActivate: [AuthGuard], component: TrackingsComponent, data: { titulo: 'Mantenimiento de Seguimientos' } },
  { path: 'tracking/:id', canActivate: [AuthGuard], component: TrackingDetailComponent, data: { titulo: 'Mantenimiento de Seguimiento' } },


]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
