import { Injectable, inject } from '@angular/core';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { SelectTictactoeIconComponent } from '../modal';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  readonly modalController = inject(ModalController);
  readonly toastController = inject(ToastController);
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

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkIcon(num: number) {
    return {
      2: 'O',
      1: 'X',
    }[num];
  }
}
