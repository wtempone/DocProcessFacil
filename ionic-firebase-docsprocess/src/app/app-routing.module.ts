import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'home-post', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/authenticate/login/login.module').then(m => m.LoginPageModule) },
  { path: 'sign-up', loadChildren: () => import('./pages/authenticate/sign-up/sign-up.module').then(m => m.SignUpPageModule) },
  { path: 'home-appointment', canActivate: [AuthGuard], loadChildren: () => import('./pages/appointment/home-appointment/home-appointment.module').then(m => m.HomeAppointmentPageModule) },
  { path: 'home-appointment/make-appointment', canActivate: [AuthGuard], loadChildren: () => import('./pages/appointment/make-appointment/make-appointment.module').then(m => m.MakeAppointmentPageModule) },
  { path: 'edit-appointment/:id', canActivate: [AuthGuard], loadChildren: () => import('./pages/appointment/edit-appointment/edit-appointment.module').then(m => m.EditAppointmentPageModule) },
  { path: 'list-appointment', canActivate: [AuthGuard], loadChildren: () => import('./pages/appointment/list-appointment/list-appointment.module').then(m => m.ListAppointmentPageModule) },
  { path: 'take-photo', canActivate: [AuthGuard], loadChildren: () => import('./pages/post/take-photo/take-photo.module').then(m => m.TakePhotoPageModule) },
  { path: 'make-post', canActivate: [AuthGuard], loadChildren: () => import('./pages/post/make-post/make-post.module').then(m => m.MakePostPageModule) },
  { path: 'home-post', canActivate: [AuthGuard], loadChildren: () => import('./pages/post/home-post/home-post.module').then(m => m.HomePostPageModule) },
  { path: 'map-post', canActivate: [AuthGuard], loadChildren: () => import('./pages/post/map-post/map-post.module').then(m => m.MapPostPageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
