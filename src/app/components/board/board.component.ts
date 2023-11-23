import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TictactoeIconComponent } from '..';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [IonicModule, TictactoeIconComponent],
  template: `
    <ion-card [disabled]="disable" mode="ios">
      <ion-grid mode="ios">
        <ion-row mode="ios">
          <ion-col
            mode="ios"
            size="4"
            class="border"
            *ngFor="let val of boardGamePositions; let i = index"
          >
            <app-tictactoe-icon [value]="val" (click)="triggerClick.emit(i)" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
  `,
  styles: ``,
})
export class BoardComponent {
  @Input({ required: true }) disable: boolean;
  @Input({ required: true }) boardGamePositions: number[];
  @Output() triggerClick = new EventEmitter<number>();
}
