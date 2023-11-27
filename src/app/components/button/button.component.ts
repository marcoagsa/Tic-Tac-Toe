import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IonicModule, TitleCasePipe],
  template: `
    <ion-button
      class="ion-margin"
      expand="block"
      [color]="color"
      shape="round"
      size="large"
      mode="ios"
      [disabled]="disabled"
      (click)="triggerClick.emit()"
    >
      {{ label | titlecase }}
    </ion-button>
  `,
  styles: `ion-button {font-size:14px; margin: 0;}`,
})
export class ButtonComponent {
  @Input({ required: true }) label: string;
  @Input() disabled: boolean | undefined;
  @Input() color: string = 'tic-tac-toe';
  @Output() triggerClick = new EventEmitter();
}
