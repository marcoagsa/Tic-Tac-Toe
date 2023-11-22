import { Injectable } from '@angular/core';
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
  constructor(
    readonly modalController: ModalController,
    readonly toastController: ToastController,
    readonly loadingCtrl: LoadingController
  ) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: SelectTictactoeIconComponent,
      backdropDismiss: false,
      showBackdrop: true,
      keyboardClose: true,
      breakpoints: [0, 0.25],
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      header: 'The Winner is... ',
      message,
      color: 'primary',
      mode: 'ios',
      cssClass: 'toast',
      position: 'middle',
      duration: 5000,
    });
    toast.present();
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
