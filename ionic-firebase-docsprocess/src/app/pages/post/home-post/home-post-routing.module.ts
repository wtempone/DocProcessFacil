import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePostPage } from './home-post.page';

const routes: Routes = [
  {
    path: '',
    component: HomePostPage,
  },
  { 
    path: 'make-post', 
    loadChildren: () => import('../make-post/make-post.module').then( m => m.MakePostPageModule) },
  {  
    path: 'take-photo',
    loadChildren: () => import('../take-photo/take-photo.module').then( m => m.TakePhotoPageModule)
  },
  { path: 'map-post',
    loadChildren: () => import('../map-post/map-post.module').then( m => m.MapPostPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePostPageRoutingModule {}
