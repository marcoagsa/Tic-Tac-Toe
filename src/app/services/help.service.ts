import { Injectable } from '@angular/core';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverSelectIconComponent } from '../components/popover-select-icon/popover-select-icon.component';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(
    private readonly popoverCtrl: PopoverController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

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
  async shwoLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loading',
      message: 'Loading...',
    });
    await loading.present();
  }

  hideLoading(hide = false): void {
    if (hide) {
      this.loadingCtrl.dismiss();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      header: 'The Winner is... ',
      message,
      color: 'primary',
      mode: 'ios',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }
}
