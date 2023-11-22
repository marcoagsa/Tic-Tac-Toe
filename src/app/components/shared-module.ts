import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TictactoeIconComponent } from '.';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TictactoeIconComponent],
  declarations: [],
  exports: [TictactoeIconComponent],
})
export class SharedModule {}
