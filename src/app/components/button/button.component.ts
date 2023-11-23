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
      color="tic-tac-toe"
      shape="round"
      size="large"
      mode="ios"
      [disabled]="disabled"
      (click)="triggerClick.emit()"
    >
      {{ label | titlecase }}
    </ion-button>
  `,
  styles: ``,
})
export class ButtonComponent {
  @Input({ required: true }) label: string;
  @Input() disabled: boolean | undefined;
  @Output() triggerClick = new EventEmitter();
}
