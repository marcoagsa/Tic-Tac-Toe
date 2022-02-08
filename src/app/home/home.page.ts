import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'Rooster Game';
  gameLogo = '/assets/roosterImg.jpeg';
  startButtonLabel = 'start';

  constructor(
    private readonly navCtrl: NavController,
    public readonly platform: Platform,
  ) {}

  startGame(): void {
    this.navCtrl.navigateForward('/roostergame');
  }
}
