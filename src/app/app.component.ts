import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `<ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>`,
  standalone: true,
  imports: [IonicModule],
  styles: ``,
})
export class AppComponent {}
