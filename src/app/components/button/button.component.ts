import { Component, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IonButton, TitleCasePipe],
  template: `
    <ion-button
      expand="block"
      [color]="color()"
      shape="round"
      size="large"
      [disabled]="disabled()"
      (click)="triggerClick.emit()"
    >
      {{ label() | titlecase }}
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
  label = input.required<string>();
  color = input<string>('tic-tac-toe');
  disabled = input<boolean | undefined>(undefined);
  triggerClick = output();
}
