import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppointmentPage } from './list-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ListAppointmentPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAppointmentPageRoutingModule {}
