import { HelpService } from 'src/app/services/help.service';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-score-header',
  standalone: true,
  imports: [IonicModule, TitleCasePipe, NgClass],
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Game Score</ion-card-subtitle>
        <ion-card-title>Tic Tac Toe</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-icon
                mode="ios"
                name="person-outline"
                [color]="iconColor(userIcon)"
                [ngClass]="{ blink: userIsNext && userIcon }"
              />
            </ion-col>
            <ion-col size="8" class="center">
              @if(userIcon !== null && winner === null){
              <ion-text>
                {{ nextPlayerLabel | titlecase }}
              </ion-text>
              <ion-label [color]="iconColor(player)" class="blink">
                {{
                  userIsNext
                    ? helpService.checkIcon(userIcon)
                    : helpService.checkIcon(logicIcon)
                }}
              </ion-label>
              }
            </ion-col>
            <ion-col size="2" class="cpu">
              <ion-icon
                mode="ios"
                name="laptop-outline"
                [color]="iconColor(logicIcon)"
                [ngClass]="{ blink: !userIsNext && userIcon }"
              />
            </ion-col>
          </ion-row>

          <ion-row class="wins">
            <ion-label class="padding-left">
              {{ userWins }}
            </ion-label>
            <ion-label class="padding-right">
              {{ cpuWins }}
            </ion-label>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  styles: `
    ion-grid {
      display:grid;
      gap:10px
    }

    ion-col {
      padding:0px;
    }

    ion-col.center {
      display: grid;
      justify-content: center;
      justify-items: center;
    }

    ion-col.cpu {
      display: flex;
      justify-content: flex-end;
    }

    ion-row.wins {
      display: flex;
      justify-content: space-between;
    }

    ion-label {
      font-size:40px;
    }

    .padding-right {
      padding-right:10px;
    }

    .padding-left {
      padding-left:10px;
    }

    ion-icon {
      font-size: 44px;
    }

  .blink {
      animation: blink 2s steps(5, start) infinite;
      -webkit-animation: blink 1s steps(5, start) infinite;
    }
    @keyframes blink {
      to {
        visibility: hidden;
      }
    }
    @-webkit-keyframes blink {
      to {
        visibility: hidden;
      }
    }
  `,
})
export class ScoreHeaderComponent {
  @Input({ required: true }) player: number;
  @Input({ required: true }) userIsNext: boolean;
  @Input({ required: true }) userIcon: number;
  @Input({ required: true }) logicIcon: number;
  @Input({ required: true }) winner: number;
  @Input({ required: true }) userWins: number;
  @Input({ required: true }) cpuWins: number;

  nextPlayerLabel: string = 'Next Player';

  readonly helpService = inject(HelpService);

  iconColor(num: number) {
    return {
      1: 'tic-tac-toe',
      2: 'danger',
    }[num];
  }
}
