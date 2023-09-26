import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTemplatePageRoutingModule } from './list-template-routing.module';

import { ListTemplatePage } from './list-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTemplatePageRoutingModule
  ],
  declarations: [ListTemplatePage]
})
export class ListTemplatePageModule {}
