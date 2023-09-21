import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAppointmentPage } from './home-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAppointmentPage,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('../list-appointment/list-appointment.module').then( m => m.ListAppointmentPageModule)
          }
        ]
      },
      {
        path: 'make-appointment',
        children: [
          {
            path: '',
             loadChildren: () => import('../make-appointment/make-appointment.module').then( m => m.MakeAppointmentPageModule)
          }
        ]
      },
      {  
        path: 'edit-appointment/:id',
        children: [{
          path: '',
          loadChildren: () => import('../edit-appointment/edit-appointment.module').then( m => m.EditAppointmentPageModule)
        }]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAppointmentPageRoutingModule {}
