import { Injectable } from '@angular/core';
import {
  LoadingController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { PopoverSelectIconComponent } from '../components/popover-select-icon/popover-select-icon.component';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(
    private readonly popoverCtrl: PopoverController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async openPopover() {
    const popover = await this.popoverCtrl.create({
      component: PopoverSelectIconComponent,
      cssClass: 'transparent-modal',
      componentProps: {},
      backdropDismiss: false,
      translucent: false,
    });
    await popover.present();
    return popover.onDidDismiss();
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
