import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListAppointmentPage } from './list-appointment.page';

import { ListAppointmentPageRoutingModule } from './list-appointment-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAppointmentPageRoutingModule
  ],
  declarations: [ListAppointmentPage]
})
export class ListAppointmentPageModule {}
