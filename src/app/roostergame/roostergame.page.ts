import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpService } from '../services/help.service';

@Component({
  selector: 'app-roostergame',
  templateUrl: './roostergame.page.html',
  styleUrls: ['./roostergame.page.scss'],
})
export class RoostergamePage implements OnInit {

  newGameButtonLabel = 'New Game ???';
  userIcon = null;
  cpuIcon = null;
  // value = null;

  userWins = 0;
  cpuWins = 0;

  boardGamePositions: number[];
  winner: number;
  lastWinner: number;
  userIsNext: boolean;

  constructor(private readonly helperService: HelpService) { }

  get player() {
    return this.userIsNext ? this.userIcon : this.cpuIcon;
  }

  ngOnInit() {
    this.iconPick();
    this.newGame();
  }

  iconPick(): void {
    this.helperService.openPopover().then((data) => {
      if(data.data) {
        this.userIcon = data.data.userIcon;
        this.cpuIcon = data.data.cpuIcon;
      }
     });;
  }

  newGame(): void {
    this.boardGamePositions = Array(9).fill(null);
    this.winner = null;
    this.userIsNext = true;
  }

  makeMove(index: number): void {
    if (!this.boardGamePositions[index] && this.winner === null) {
      this.boardGamePositions.splice(index, 1, this.player);
      this.userIsNext = !this.userIsNext;
    }
    this.winner = this.checkWinner();
    if (this.player === this.cpuIcon && this.winner === null) {
      this.helperService.shwoLoading();
      this.cpuMove();
    }
  }

  isDraw(): boolean {
    let tie = false;
    if (this.boardGamePositions.filter((el) => el === null).length === 0 && this.winner === null) {
      tie = true;
    }
    return tie;
  }

  cpuMove(): void {
    const timeout = 500;
    setTimeout(() => {
      const idx = this.helperService.getRandomIntInclusive(0, 8);
      if (!this.boardGamePositions[idx] && this.winner === null) {
        this.helperService.hideLoading();
        this.boardGamePositions.splice(idx, 1, this.player);
        this.userIsNext = !this.userIsNext;
      } else {
        this.cpuMove();
      }
      this.winner = this.checkWinner();
    }, timeout);
  }

  countWins(): void {
    const win = this.winner;
    if (win === this.userIcon) {
      this.userWins = this.userWins + 1;
      this.helperService.presentToast('Rate Message');
    } else {
      this.cpuWins = this.cpuWins + 1;
      this.helperService.presentToast('Rate Message');
    }
  }

  checkWinner(): number {
    const positionsOfWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const [index, value] of positionsOfWins.entries()) {
      const [a, b, c] = positionsOfWins[index];
      if (
        this.boardGamePositions[a] &&
        this.boardGamePositions[a] === this.boardGamePositions[b] &&
        this.boardGamePositions[a] === this.boardGamePositions[c]) {
        return this.boardGamePositions[a];
      }
    }
    return null;
  }

}
