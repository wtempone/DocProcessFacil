import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTemplatePage } from './home-template.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTemplatePage,
    children: [
      {
        path: 'make-template',
        loadChildren: () => import('../make-template/make-template.module').then( m => m.MakeTemplatePageModule)
      },
    
      {
        path: 'list-template',
        loadChildren: () => import('../list-template/list-template.module').then( m => m.ListTemplatePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTemplatePageRoutingModule {}
