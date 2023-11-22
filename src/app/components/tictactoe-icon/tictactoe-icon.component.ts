import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tictactoe-icon',
  standalone: true,
  imports: [IonicModule],
  template: `@if (value === 'X') {
    <ion-icon
      mode="ios"
      slot="icon-only"
      name="close-outline"
      color="tic-tac-toe"
    />
    } @else if(value === 'O') {
    <ion-icon
      mode="ios"
      slot="icon-only"
      name="ellipse-outline"
      color="danger"
    />
    } @else{
    <ion-icon mode="ios" slot="icon-only" name="" />
    }`,
  styles: `
    ion-icon {
      font-size: 100px;
    }
  `,
})
export class TictactoeIconComponent {
  @Input() value;

  get Color(): string {
    return this.value === '1' ? 'primary' : 'danger';
  }
}
