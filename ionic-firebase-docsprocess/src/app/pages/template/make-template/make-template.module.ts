import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeTemplatePageRoutingModule } from './make-template-routing.module';

import { MakeTemplatePage } from './make-template.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SaveTemplateComponent } from '../save-template/save-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CKEditorModule,
    MakeTemplatePageRoutingModule
  ],
  declarations: [MakeTemplatePage, SaveTemplateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MakeTemplatePageModule {}
