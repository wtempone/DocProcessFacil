import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPostPageRoutingModule } from './map-post-routing.module';

import { MapPostPage } from './map-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPostPageRoutingModule
  ],
  declarations: [MapPostPage]
})
export class MapPostPageModule {}
