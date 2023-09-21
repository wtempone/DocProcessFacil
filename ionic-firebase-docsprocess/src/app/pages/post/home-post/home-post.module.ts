import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePostPageRoutingModule } from './home-post-routing.module';

import { HomePostPage } from './home-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePostPageRoutingModule
  ],
  declarations: [HomePostPage]
})
export class HomePostPageModule {}
