import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTemplatePage } from './list-template.page';

const routes: Routes = [
  {
    path: '',
    component: ListTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTemplatePageRoutingModule {}
