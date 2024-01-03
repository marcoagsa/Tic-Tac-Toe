import { Injectable, inject } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular/standalone';
import { SelectTicTacToeIconComponent } from '../modal';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  readonly modalController = inject(ModalController);
  readonly alertController = inject(AlertController);
  readonly loadingCtrl = inject(LoadingController);

  async openModal() {
    const modal = await this.modalController.create({
      component: SelectTicTacToeIconComponent,
      backdropDismiss: false,
      showBackdrop: true,
      keyboardClose: true,
      breakpoints: [0.25],
      initialBreakpoint: 0.25,
      handleBehavior: 'cycle',
    });
    await modal.present();
    return modal.onDidDismiss();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loading',
      mode: 'ios',
      message: 'I´m thinking...',
    });
    await loading.present();
  }

  hideLoading(): void {
    this.loadingCtrl.dismiss();
  }

  async winnerAlert(winner: number, whoWon: string) {
    const alertButtons = [
      {
        text: 'Exit',
        role: 'cancel',
      },
      {
        text: 'Again',
        role: 'confirm',
      },
    ];

    const alert = await this.alertController.create({
      header: whoWon.includes('Draw') ? 'No Winner' : 'The winner ',
      message: whoWon.includes('Draw')
        ? 'This time there was no winner!'
        : `The winner on this time was: <br>  <ion-text> ${whoWon} </ion-text class"danger"> <br> <ion-note class="${
            winner === 2 ? 'danger' : 'tic-tac-toe'
          }"> ${this.checkIcon(winner)} </ion-note>`,
      buttons: alertButtons,
      backdropDismiss: false,
      translucent: true,
      cssClass: 'custom-alert',
    });

    await alert.present();
    return await alert.onDidDismiss();
  }

  checkIcon(num: number) {
    return {
      2: 'O',
      1: 'X',
    }[num];
  }
}
