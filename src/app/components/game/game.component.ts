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
    <ion-content [fullscreen]="true" class="ion-padding" scrollY="false">
      <ion-grid fixed>
        <app-score-header
          [userIsNext]="userIsNext"
          [userIcon]="userIcon"
          [logicIcon]="logicIcon"
          [userWins]="userWins"
          [cpuWins]="cpuWins"
          [winner]="winner"
          [player]="player"
        />
        <app-board
          [disabled]="disableBoard"
          [boardGamePositions]="boardGamePositions"
          (triggerClick)="userMove($event)"
        />
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-padding">
      <app-button
        [label]="buttonLabel"
        [disabled]="disableButton"
        (triggerClick)="init()"
      />
    </ion-footer>
  `,
  styles: `
    ion-grid {
      display: grid;
      gap:10px;
      padding-top:10%;
    }

  `,
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
    const timeout = 500;

    setTimeout(() => {
      const logicPosition = this.logicAvoidUserVictory();

      if (!this.boardGamePositions[logicPosition] && this.winner === null) {
        this.boardGamePositions.splice(logicPosition, 1, this.player);
        this.userIsNext = !this.userIsNext;
        this.helperService.hideLoading();
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

  logicAvoidUserVictory(): number {
    for (const position of this.positionsOfWins) {
      const [pos1, pos2, pos3] = position;

      const p1 = this.boardGamePositions[pos1];
      const p2 = this.boardGamePositions[pos2];
      const p3 = this.boardGamePositions[pos3];

      if (p1 !== null && p1 === p2 && p3 === null) {
        return pos3;
      }
      if (p1 !== null && p1 === p3 && p2 === null) {
        return pos2;
      }
      if (p2 !== null && p2 === p3 && p1 === null) {
        return pos1;
      }
    }

    return this.logicRadomMove();
  }

  logicRadomMove(): number {
    let pos: number[] = [];
    for (const [index, value] of this.boardGamePositions.entries()) {
      if (value === null) {
        pos.push(index);
      }
    }
    const index = Math.floor(Math.random() * pos.length);
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
