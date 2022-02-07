import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'Rooster Game';
  gameLogo = '/assets/roosterImg.jpeg';
  startButtonLabel = 'start';

  constructor() {}

}
