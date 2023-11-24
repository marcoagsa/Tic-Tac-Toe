import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TictactoeIconComponent } from '..';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [IonicModule, TictactoeIconComponent],
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
