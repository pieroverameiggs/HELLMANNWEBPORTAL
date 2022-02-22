import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotifyComponent } from './settings/notify.component';
import { CustomsDetailComponent } from './trackings/customs-detail.component';
import { TrackingDetailComponent } from './trackings/tracking-detail.component';
import { TrackingsComponent } from './trackings/trackings.component';

const childRoutes: Routes = [

  //Dashboard
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },

  //Seguimiento
  { path: 'trackings', canActivate: [AuthGuard], component: TrackingsComponent, data: { titulo: 'Mantenimiento de Seguimientos' } },
  { path: 'operation/:id', canActivate: [AuthGuard], component: TrackingDetailComponent, data: { titulo: 'Mantenimiento de Operación' } },
  { path: 'customs/:id', canActivate: [AuthGuard], component: CustomsDetailComponent, data: { titulo: 'Mantenimiento de Aduana' } },

  //Configuración
  { path: 'notifications', canActivate: [AuthGuard], component: NotifyComponent, data: { titulo: 'Mantenimiento de Notificaciones' } },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
