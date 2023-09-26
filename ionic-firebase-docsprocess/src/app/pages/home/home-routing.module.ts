import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'home-post',
        loadChildren: () => import('../post/home-post/home-post.module').then( m => m.HomePostPageModule)
      },
      {
        path: 'home-appointment',
        loadChildren: () => import('../appointment/home-appointment/home-appointment.module').then( m => m.HomeAppointmentPageModule)
      },
      {
        path: 'home-template',
        loadChildren: () => import('../template/home-template/home-template.module').then( m => m.HomeTemplatePageModule)
      },
      {
        path: 'teste',
        loadChildren: () => import('../teste/teste/teste.module').then( m => m.TestePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
