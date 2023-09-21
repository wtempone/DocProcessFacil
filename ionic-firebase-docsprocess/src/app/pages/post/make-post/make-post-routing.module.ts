import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakePostPage } from './make-post.page';

const routes: Routes = [
  {
    path: '',
    component: MakePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakePostPageRoutingModule {}
