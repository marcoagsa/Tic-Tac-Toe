import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopoverSelectIconComponent } from './popover-select-icon/popover-select-icon.component';
import { RoosterIconComponent } from './rooster-icon/rooster-icon.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    RoosterIconComponent,
    PopoverSelectIconComponent
  ],
  exports: [
    RoosterIconComponent,
    PopoverSelectIconComponent
  ]
})
export class SharedModule { }
