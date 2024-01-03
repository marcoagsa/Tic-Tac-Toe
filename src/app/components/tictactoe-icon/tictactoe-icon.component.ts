import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, ellipseOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tictactoe-icon',
  standalone: true,
  imports: [IonIcon],
  template: `@if (value === 1) {
      <ion-icon
        mode="ios"
        slot="icon-only"
        name="close-outline"
        color="tic-tac-toe"
      />
    } @else if (value === 2) {
      <ion-icon
        mode="ios"
        slot="icon-only"
        name="ellipse-outline"
        color="danger"
      />
    } @else {
      <ion-icon mode="ios" slot="icon-only" name="" />
    }`,
  styles: `
    ion-icon {
      font-size: 90px;
    }
  `,
})
export class TicTacToeIconComponent {
  @Input({ required: true }) value: number;
  constructor() {
    addIcons({ closeOutline, ellipseOutline });
  }
}
