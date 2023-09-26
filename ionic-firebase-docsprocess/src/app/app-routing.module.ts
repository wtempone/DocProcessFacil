import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/authenticate/login/login.module').then(m => m.LoginPageModule) },
  { path: 'sign-up', loadChildren: () => import('./pages/authenticate/sign-up/sign-up.module').then(m => m.SignUpPageModule) },
  { path: 'reset-password',loadChildren: () => import('./pages/authenticate/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)},  { path: 'home-appointment', canActivate: [AuthGuard], loadChildren: () => import('./pages/appointment/home-appointment/home-appointment.module').then(m => m.HomeAppointmentPageModule) },
  { path: 'home', canActivate: [AuthGuard],  loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
