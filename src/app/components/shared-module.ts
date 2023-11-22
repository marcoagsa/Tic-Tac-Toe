import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScoreHeaderComponent, TictactoeIconComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TictactoeIconComponent,
    ScoreHeaderComponent,
  ],
  declarations: [],
  exports: [TictactoeIconComponent, ScoreHeaderComponent],
})
export class SharedModule {}
