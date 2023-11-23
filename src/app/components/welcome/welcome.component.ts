import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [IonicModule, NgClass, TitleCasePipe, ButtonComponent],
  template: `
    <ion-content [fullscreen]="true" scrollY="false">
      <ion-label mode="ios" class="title" color="tic-tac-toe">{{
        pageTitle
      }}</ion-label>

      <ion-card mode="ios">
        <ion-img class="logo" [src]="gameLogo" />
      </ion-card>
    </ion-content>

    <ion-footer mode="ios" class="ion-no-border">
      <app-button [label]="buttonLabel" (triggerClick)="init()" />
    </ion-footer>
  `,
  styles: `
    .title {
      display: flex;
      font-size: 10vh;
      font-family: monospace;
      text-align: -webkit-center;
      justify-content: center;
    }
    ion-card {
      background: var(--ion-background-color);
    }
    ion-img {
      display: flex;
      margin: 0 auto;
    }
  `,
})
export class WelcomeComponent {
  pageTitle: string = 'Tic-tac-toe';
  gameLogo: string = '/assets/tictactoe.png';
  buttonLabel = 'start';

  routerCtrl = inject(Router);

  init() {
    this.routerCtrl.navigateByUrl('/roostergame');
  }
}
