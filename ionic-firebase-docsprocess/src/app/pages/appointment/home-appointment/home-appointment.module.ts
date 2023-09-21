import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAppointmentPageRoutingModule } from './home-appointment-routing.module';

import { HomeAppointmentPage } from './home-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAppointmentPageRoutingModule
  ],
  declarations: [HomeAppointmentPage]
})
export class HomeAppointmentPageModule {}
