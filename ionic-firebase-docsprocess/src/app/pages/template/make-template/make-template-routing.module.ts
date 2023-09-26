import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeTemplatePage } from './make-template.page';

const routes: Routes = [
  {
    path: '',
    component: MakeTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeTemplatePageRoutingModule {}
