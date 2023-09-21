import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakePostPageRoutingModule } from './make-post-routing.module';

import { MakePostPage } from './make-post.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakePostPageRoutingModule
  ],
  declarations: [MakePostPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MakePostPageModule {}
