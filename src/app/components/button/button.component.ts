import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IonicModule, TitleCasePipe],
  template: `
    <ion-button
      expand="block"
      [color]="color"
      shape="round"
      size="large"
      [disabled]="disabled"
      (click)="triggerClick.emit()"
    >
      {{ label | titlecase }}
    </ion-button>
  `,
  styles: `
    ion-button {
      font-size: 12px;
      margin: 0;
   }
  `,
})
export class ButtonComponent {
  @Input({ required: true }) label: string;
  @Input() disabled: boolean | undefined;
  @Input() color: string = 'tic-tac-toe';
  @Output() triggerClick = new EventEmitter();
}
