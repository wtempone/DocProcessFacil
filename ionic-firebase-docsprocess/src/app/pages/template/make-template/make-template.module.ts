import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeTemplatePageRoutingModule } from './make-template-routing.module';

import { MakeTemplatePage } from './make-template.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CKEditorModule,
    MakeTemplatePageRoutingModule
  ],
  declarations: [MakeTemplatePage]
})
export class MakeTemplatePageModule {}
