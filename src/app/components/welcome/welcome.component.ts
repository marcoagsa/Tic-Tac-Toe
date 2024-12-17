import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonFooter,
  IonImg,
  IonLabel,
} from '@ionic/angular/standalone';
import { ButtonComponent } from '../button/button.component';

const imports = [IonContent, IonLabel, IonImg, IonFooter, ButtonComponent];

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports,
  template: `
    <ion-content [fullscreen]="true" scrollY="false" class="ion-padding">
      <ion-label mode="ios" class="title" color="tic-tac-toe">
        {{ pageTitle }}
      </ion-label>
      <ion-img class="logo" [src]="gameLogo" />
    </ion-content>

    <ion-footer mode="ios" class="ion-no-border ion-padding">
      <app-button [label]="buttonLabel" (triggerClick)="init()" />
    </ion-footer>
  `,
  styles: `
    ion-label.title {
      display: flex;
      font-size: 10vh;
      font-family: monospace;
      text-align: -webkit-center;
      justify-content: center;
      margin-top: 10%;
    }

    ion-card {
      background: var(--ion-background-color);
    }

    ion-img {
      display: flex;
      margin: 0 auto;
    }

    ion-footer {
      padding-bottom: 50px;
    }
  `,
})
export class WelcomeComponent {
  readonly pageTitle: string = 'Tic-tac-toe';
  readonly gameLogo: string = '/assets/tictactoe.png';
  readonly buttonLabel = 'start';
  readonly routerCtrl = inject(Router);

  init() {
    this.routerCtrl.navigateByUrl('/game');
  }
}
