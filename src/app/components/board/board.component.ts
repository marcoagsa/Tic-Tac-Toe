import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCard, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { TicTacToeIconComponent } from '../tictactoe-icon/tictactoe-icon.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [IonCard, IonGrid, IonRow, IonCol, TicTacToeIconComponent],
  template: `
    <ion-card [disabled]="disabled" mode="ios">
      <ion-grid mode="ios">
        <ion-row mode="ios">
          @for (val of boardGamePositions; track val; let i = $index) {
            <ion-col mode="ios" size="4" class="border">
              <app-tictactoe-icon
                [value]="val"
                (click)="triggerClick.emit(i)"
              />
            </ion-col>
          }
        </ion-row>
      </ion-grid>
    </ion-card>
  `,
  styles: `

    ion-card {
      margin:0;
    }

    ion-col {
      display: flex;
      justify-content: center;
    }

    .label--user {
      padding-left: 5px;
      font-size: 30px;
    }

    .label--cpu {
      padding-right: 5px;
      font-size: 30px;
    }

    ion-col.border {
      border: solid 1px #9d9fa6;
    }
`,
})
export class BoardComponent {
  @Input({ required: true }) disabled: boolean;
  @Input({ required: true }) boardGamePositions: number[];
  @Output() triggerClick = new EventEmitter<number>();
}
