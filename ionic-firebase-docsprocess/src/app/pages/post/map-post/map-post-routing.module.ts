import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapPostPage } from './map-post.page';

const routes: Routes = [
  {
    path: '',
    component: MapPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPostPageRoutingModule {}
