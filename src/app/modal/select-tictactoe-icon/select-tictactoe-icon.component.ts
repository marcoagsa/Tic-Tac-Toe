import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-tictactoe-icon',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header mode="ios">
      <ion-toolbar mode="ios" class="ion-no-padding">
        <ion-title mode="ios" class="ion-no-padding" color="tic-tac-toe"
          >Select your Icon !</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-row mode="ios">
        <ion-col mode="ios" size="6" class="border-right">
          <ion-button
            mode="ios"
            expand="block"
            fill="outline"
            color="tic-tac-toe"
            (click)="selectUserIcon(1)"
          >
            <ion-icon mode="ios" slot="icon-only" name="close-outline" />
          </ion-button>
        </ion-col>
        <ion-col mode="ios" size="6">
          <ion-button
            mode="ios"
            expand="block"
            fill="outline"
            color="danger"
            (click)="selectUserIcon(2)"
          >
            <ion-icon mode="ios" slot="icon-only" name="ellipse-outline" />
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  `,
  styles: `
    ion-col {
      padding:0;
      padding: 2vh 3vh 2vh 3vh;
    }

    ion-col.border-right {
      border-right: solid 2px #9d9fa6;
    }

    ion-icon {
      font-size: 10vh;
    }

    ion-button {
      margin:0;
      padding: 2vh;
    }
    `,
})
export class SelectTictactoeIconComponent {
  readonly modalCrt = inject(ModalController);
  selectUserIcon(num: number): void {
    this.modalCrt.dismiss(num);
  }
}
