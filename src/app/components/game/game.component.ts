import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HelpService } from 'src/app/services/help.service';
import { BoardComponent, ButtonComponent, ScoreHeaderComponent } from '..';
import { POSITIONS_OF_WINS } from 'src/app/constants';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    IonicModule,
    ScoreHeaderComponent,
    BoardComponent,
    ButtonComponent,
    UpperCasePipe,
  ],
  template: `
    <app-score-header
      [userIsNext]="userIsNext"
      [userIcon]="userIcon"
      [logicIcon]="logicIcon"
      [userWins]="userWins"
      [cpuWins]="cpuWins"
      [winner]="winner"
      [player]="player"
      class="ion-padding"
    />
    <ion-content class="ion-padding" scrollY="false">
      <app-board
        [disabled]="disableBoard"
        [boardGamePositions]="boardGamePositions"
        (triggerClick)="userMove($event)"
      />
    </ion-content>
    <ion-footer class="ion-padding">
      <app-button
        [label]="buttonLabel"
        [disabled]="disableButton"
        (triggerClick)="init()"
      />
    </ion-footer>
  `,
  styles: ``,
})
export class GameComponent implements OnInit {
  readonly helperService = inject(HelpService);
  positionsOfWins = POSITIONS_OF_WINS;
  boardGamePositions: number[];
  buttonLabel: string = 'New Game';
  userIcon: number = null;
  logicIcon: number = null;
  userIsNext: boolean;
  winner: number | undefined;
  userWins: number = 0;
  cpuWins: number = 0;

  get player() {
    return this.userIsNext ? this.userIcon : this.logicIcon;
  }

  get disableButton() {
    return this.winner === null && !this.isDraw();
  }

  get disableBoard() {
    return this.winner !== null || this.isDraw();
  }

  get userWin() {
    return this.winner === this.userIcon;
  }

  async ngOnInit() {
    await this.iconPick();
    this.init();
  }

  async iconPick(): Promise<any> {
    const { data } = await this.helperService.openModal();

    if (!data) {
      return;
    }
    this.userIcon = data;
    this.logicIcon = data === 2 ? 1 : 2;
  }

  init(): void {
    this.boardGamePositions = Array(9).fill(null);
    this.winner = null;
    this.userIsNext = true;
  }

  isDraw(): boolean {
    let tie = false;
    if (
      this.boardGamePositions.filter((el) => el === null).length === 0 &&
      this.winner === null
    ) {
      tie = true;
    }
    return tie;
  }

  userMove(index: number): void {
    if (!this.boardGamePositions[index] && this.winner === null) {
      this.boardGamePositions.splice(index, 1, this.player);
      this.userIsNext = !this.userIsNext;
    }
    this.winner = this.checkWinner();
    if (this.winner !== null) {
      this.updateWinner();
    }
    if (!this.userIsNext && this.winner === null && !this.isDraw()) {
      this.helperService.showLoading();
      this.logicalMove();
    }
  }

  logicalMove(): void {
    const timeout = 1000;
    setTimeout(() => {
      const logicPosition = this.checkVictoryPosition();
      console.log(`MSA 🔊 logicPosition:`, logicPosition);

      if (!this.boardGamePositions[logicPosition] && this.winner === null) {
        this.helperService.hideLoading();
        this.boardGamePositions.splice(logicPosition, 1, this.player);
        this.userIsNext = !this.userIsNext;
      } else {
        this.logicalMove();
      }
      this.winner = this.checkWinner();
      if (this.winner !== null) {
        this.updateWinner();
      }
    }, timeout);
  }

  updateWinner(): void {
    this.userWin ? (this.userWins += 1) : (this.cpuWins += 1);
  }

  checkVictoryPosition(): number {
    for (const position of this.positionsOfWins) {
      const [posicao1, posicao2, posicao3] = position;

      const simboloPosicao1 = this.boardGamePositions[posicao1];
      const simboloPosicao2 = this.boardGamePositions[posicao2];
      const simboloPosicao3 = this.boardGamePositions[posicao3];

      if (
        simboloPosicao1 !== null &&
        simboloPosicao1 === simboloPosicao2 &&
        simboloPosicao3 === null
      ) {
        return posicao3;
      }
      if (
        simboloPosicao1 !== null &&
        simboloPosicao1 === simboloPosicao3 &&
        simboloPosicao2 === null
      ) {
        return posicao2;
      }
      if (
        simboloPosicao2 !== null &&
        simboloPosicao2 === simboloPosicao3 &&
        simboloPosicao1 === null
      ) {
        return posicao1;
      }
    }

    const positions = this.boardGamePositions.filter(
      (position) => position === null
    );
    const index = Math.floor(Math.random() * positions.length);
    return index;
  }

  checkWinner(): number {
    for (const [index, value] of this.positionsOfWins.entries()) {
      const [a, b, c] = this.positionsOfWins[index];
      if (
        this.boardGamePositions[a] &&
        this.boardGamePositions[a] === this.boardGamePositions[b] &&
        this.boardGamePositions[a] === this.boardGamePositions[c]
      ) {
        return this.boardGamePositions[a];
      }
    }
    return null;
  }
}
