import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeTemplatePageRoutingModule } from './make-template-routing.module';

import { MakeTemplatePage } from './make-template.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SaveTemplateComponent } from '../save-template/save-template.component';
import { DocsRequireEditComponent } from './docs-require-edit/docs-require-edit.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { DropzoneDirective } from 'src/app/directives/dropzone/dropzone.directive';
import { PdfViewerModule } from 'ng2-pdf-viewer'; 
import { DocExtractionComponent } from './doc-extraction/doc-extraction.component';
import { DocReviewComponent } from './doc-review/doc-review.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CKEditorModule,
    MakeTemplatePageRoutingModule,
    PdfViewerModule
  ],
  declarations: [MakeTemplatePage, SaveTemplateComponent, DocsRequireEditComponent, UploadTaskComponent, DropzoneDirective, DocExtractionComponent, DocReviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MakeTemplatePageModule {}
