import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { ScorePanel } from 'src/app/interfaces';
import { HelpService } from 'src/app/services/help.service';
import { addIcons } from 'ionicons';
import { laptopOutline, personOutline } from 'ionicons/icons';

const imports = [
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonLabel,
  TitleCasePipe,
  NgClass,
];

@Component({
  selector: 'app-score-header',
  standalone: true,
  imports,
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle> {{ subTitle }} </ion-card-subtitle>
        <ion-card-title> {{ title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row class="header">
            <ion-col size="2">
              <ion-icon
                name="person-outline"
                [color]="iconColor(scorePanel().userIcon)"
                [ngClass]="{
                  blink: scorePanel().userIsNext && scorePanel().userIcon
                }"
              />
            </ion-col>
            <ion-col size="8" class="center">
              @if (
                scorePanel().userIcon !== null && scorePanel().winner === null
              ) {
                <ion-text>
                  {{ nextPlayerLabel | titlecase }}
                </ion-text>
                <ion-label [color]="iconColor(player())" class="blink">
                  {{
                    scorePanel().userIsNext
                      ? helpService.checkIcon(scorePanel().userIcon)
                      : helpService.checkIcon(scorePanel().logicIcon)
                  }}
                </ion-label>
              }
            </ion-col>
            <ion-col size="2" class="cpu">
              <ion-icon
                name="laptop-outline"
                [color]="iconColor(scorePanel().logicIcon)"
                [ngClass]="{
                  blink: !scorePanel().userIsNext && scorePanel().userIcon
                }"
              />
            </ion-col>
          </ion-row>

          <ion-row class="wins">
            <ion-label class="padding-left">
              {{ scorePanel().userWins ?? 0 }}
            </ion-label>
            <ion-label class="padding-right">
              {{ scorePanel().logicWins ?? 0 }}
            </ion-label>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  styles: `
    ion-card {
      margin: 0;
    }

    ion-grid {
      display: grid;
      gap: 10px;
    }

    ion-row.header {
      height: 50px;
    }

    ion-col {
      padding: 0px;
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

    ion-label.ios {
      font-size: 40px;
    }

    ion-label {
      font-size: 25px;
    }

    .padding-right {
      padding-right: 5px;
    }

    .padding-left {
      padding-left: 5px;
    }

    ion-icon.ios {
      font-size: 44px;
    }

    ion-icon {
      font-size: 30px;
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
  scorePanel = input.required<ScorePanel>();
  player = input.required<number>();

  readonly title: string = 'Tic Tac Toe';
  readonly subTitle: string = 'Game Score';
  readonly nextPlayerLabel: string = 'Next Player';
  readonly helpService = inject(HelpService);

  constructor() {
    addIcons({ laptopOutline, personOutline });
  }

  iconColor(num: number) {
    return {
      1: 'tic-tac-toe',
      2: 'danger',
    }[num];
  }
}
