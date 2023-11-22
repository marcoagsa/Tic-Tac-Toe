import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoostergamePage } from './roostergame.page';
import { SharedModule } from '../components/shared-module';
import { RoostergamePageRoutingModule } from './roostergame-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoostergamePageRoutingModule,
    SharedModule,
  ],
  declarations: [RoostergamePage],
})
export class RoostergamePageModule {}
