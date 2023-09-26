import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeTemplatePageRoutingModule } from './make-template-routing.module';

import { MakeTemplatePage } from './make-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeTemplatePageRoutingModule
  ],
  declarations: [MakeTemplatePage]
})
export class MakeTemplatePageModule {}
