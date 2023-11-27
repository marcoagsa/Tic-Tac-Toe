import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ScorePanel } from 'src/app/interfaces';
import { HelpService } from 'src/app/services/help.service';

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
                [color]="iconColor(scorePanel.userIcon)"
                [ngClass]="{
                  blink: scorePanel.userIsNext && scorePanel.userIcon
                }"
              />
            </ion-col>
            <ion-col size="8" class="center">
              @if (scorePanel.userIcon !== null && scorePanel.winner === null) {
                <ion-text>
                  {{ nextPlayerLabel | titlecase }}
                </ion-text>
                <ion-label [color]="iconColor(player)" class="blink">
                  {{
                    scorePanel.userIsNext
                      ? helpService.checkIcon(scorePanel.userIcon)
                      : helpService.checkIcon(scorePanel.logicIcon)
                  }}
                </ion-label>
              }
            </ion-col>
            <ion-col size="2" class="cpu">
              <ion-icon
                mode="ios"
                name="laptop-outline"
                [color]="iconColor(scorePanel.logicIcon)"
                [ngClass]="{
                  blink: !scorePanel.userIsNext && scorePanel.userIcon
                }"
              />
            </ion-col>
          </ion-row>

          <ion-row class="wins">
            <ion-label class="padding-left">
              {{ scorePanel.userWins }}
            </ion-label>
            <ion-label class="padding-right">
              {{ scorePanel.logicWins }}
            </ion-label>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  styles: `

    ion-card {
      margin:0;
    }

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
  @Input({ required: true }) scorePanel: ScorePanel;
  @Input({ required: true }) player: number;

  readonly nextPlayerLabel: string = 'Next Player';
  readonly helpService = inject(HelpService);

  iconColor(num: number) {
    return {
      1: 'tic-tac-toe',
      2: 'danger',
    }[num];
  }
}
