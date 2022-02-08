import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoostergamePageRoutingModule } from './roostergame-routing.module';

import { RoostergamePage } from './roostergame.page';
import { RoosterIconComponent } from '../components/rooster-icon/rooster-icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoostergamePageRoutingModule
  ],
  declarations: [RoostergamePage, RoosterIconComponent]
})
export class RoostergamePageModule {}
