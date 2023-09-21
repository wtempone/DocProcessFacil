import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePostPage } from './home-post.page';

const routes: Routes = [
  {
    path: '',
    component: HomePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePostPageRoutingModule {}
