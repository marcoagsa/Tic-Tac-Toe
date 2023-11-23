import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HelpService } from 'src/app/services/help.service';
import { BoardComponent, ButtonComponent, ScoreHeaderComponent } from '..';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [IonicModule, ScoreHeaderComponent, BoardComponent, ButtonComponent],
  template: `
    <app-score-header
      [userIsNext]="userIsNext"
      [userIcon]="userIcon"
      [cpuIcon]="cpuIcon"
      [userWins]="userWins"
      [cpuWins]="cpuWins"
      [winner]="winner"
      [player]="player"
      class="ion-padding"
    />
    <ion-content class="ion-padding" scrollY="false">
      <app-board
        [disabled]="winner !== null || isDraw()"
        [boardGamePositions]="boardGamePositions"
        (triggerClick)="makeMove($event)"
      />
      <app-button
        [label]="buttonLabel"
        [disabled]="disableButton"
        (triggerClick)="init()"
      />
    </ion-content>
  `,
  styles: ``,
})
export class GameComponent implements OnInit {
  buttonLabel: string = 'New Game ???';

  userIcon: number = null;
  cpuIcon: number = null;
  userWins = 0;
  cpuWins = 0;

  boardGamePositions: number[];
  winner: number;
  lastWinner: number;
  userIsNext: boolean;

  positionsOfWins: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  readonly helperService = inject(HelpService);

  constructor() {}

  get player() {
    return this.userIsNext ? this.userIcon : this.cpuIcon;
  }

  get disableButton() {
    return this.winner === null && !this.isDraw();
  }

  ngOnInit() {
    this.iconPick();
    this.init();
  }

  async iconPick(): Promise<any> {
    const { data } = await this.helperService.openModal();

    if (!data) {
      return;
    }
    this.userIcon = data;
    this.cpuIcon = data === 2 ? 1 : 2;
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

  makeMove(index: number): void {
    if (!this.boardGamePositions[index] && this.winner === null) {
      this.boardGamePositions.splice(index, 1, this.player);
      this.userIsNext = !this.userIsNext;
    }
    this.winner = this.checkWinner();
    if (this.winner !== null) {
      this.countWins(this.winner);
    }
    if (!this.userIsNext && this.winner === null && !this.isDraw()) {
      this.helperService.showLoading();
      this.cpuMove();
    }
  }

  cpuMove(): void {
    const timeout = 1000;
    setTimeout(() => {
      let posicaoParaVitoria = this.verificarVitoria(
        this.boardGamePositions,
        this.positionsOfWins
      );

      if (posicaoParaVitoria === null) {
        posicaoParaVitoria = this.boardGamePositions.find(
          (position) => position !== null
        );
      }

      if (
        !this.boardGamePositions[posicaoParaVitoria] &&
        this.winner === null
      ) {
        this.helperService.hideLoading();
        this.boardGamePositions.splice(posicaoParaVitoria, 1, this.player);
        this.userIsNext = !this.userIsNext;
      }
      this.winner = this.checkWinner();
      if (this.winner !== null) {
        this.countWins(this.winner);
      }
    }, timeout);
  }

  countWins(winner): void {
    if (winner === this.userIcon) {
      this.userWins = this.userWins + 1;
      this.helperService.presentToast('congratulations you win!');
    } else {
      this.cpuWins = this.cpuWins + 1;
      this.helperService.presentToast('try again, you lose!');
    }
  }

  verificarVitoria(
    board: number[],
    positionsOfWins: number[][]
  ): number | null {
    for (const position of positionsOfWins) {
      const [posicao1, posicao2, posicao3] = position;

      const simboloPosicao1 = board[posicao1];
      const simboloPosicao2 = board[posicao2];
      const simboloPosicao3 = board[posicao3];

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
    return null;
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
