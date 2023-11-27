import { Injectable, inject } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { SelectTictactoeIconComponent } from '../modal';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  readonly modalController = inject(ModalController);
  readonly alertController = inject(AlertController);
  readonly loadingCtrl = inject(LoadingController);

  async openModal() {
    const modal = await this.modalController.create({
      component: SelectTictactoeIconComponent,
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

  async winnerAlert(winner: number) {
    console.log(`MSA 🔊 winner:`, winner);
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
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: alertButtons,
      backdropDismiss: false,
      translucent: true,
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
