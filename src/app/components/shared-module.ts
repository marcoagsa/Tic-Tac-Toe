import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopoverSelectIconComponent } from './popover-select-icon/popover-select-icon.component';
import { TictactoeIconComponent } from '.';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TictactoeIconComponent],
  declarations: [PopoverSelectIconComponent],
  exports: [PopoverSelectIconComponent, TictactoeIconComponent],
})
export class SharedModule {}
