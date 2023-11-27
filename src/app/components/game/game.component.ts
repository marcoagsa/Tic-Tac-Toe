import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { POSITIONS_OF_WINS } from 'src/app/constants';
import { HelpService } from 'src/app/services/help.service';
import { ScorePanel } from 'src/app/interfaces';
import { BoardComponent, ButtonComponent, ScoreHeaderComponent } from '..';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [IonicModule, ScoreHeaderComponent, BoardComponent, ButtonComponent],
  template: `
    <ion-content [fullscreen]="true" class="ion-padding" scrollY="false">
      <ion-grid fixed>
        <app-score-header [scorePanel]="scorePanel()" [player]="player" />
        @if (this.boardGamePositions) {
          <app-board
            [disabled]="disableBoard"
            [boardGamePositions]="boardGamePositions"
            (triggerClick)="userMove($event)"
          />
        }
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
  readonly buttonLabel: string = 'New Game';
  readonly positionsOfWins = POSITIONS_OF_WINS;
  readonly helperService = inject(HelpService);
  readonly routerCtrl = inject(Router);

  public boardGamePositions: number[];
  public scorePanel = signal<ScorePanel>({
    userIcon: null,
    logicIcon: null,
    userIsNext: false,
    winner: null,
    userWins: 0,
    logicWins: 0,
  });

  get player() {
    const { logicIcon, userIsNext, userIcon } = this.scorePanel();
    return userIsNext ? userIcon : logicIcon;
  }

  get disableButton() {
    return !this.scorePanel().winner && !this.isDraw();
  }

  get disableBoard() {
    return !!this.scorePanel().winner ?? this.isDraw();
  }

  get userWin() {
    return this.scorePanel().winner === this.scorePanel().userIcon;
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
    this.scorePanel().userIcon = data;
    this.scorePanel().logicIcon = data === 2 ? 1 : 2;
  }

  init(): void {
    this.boardGamePositions = Array(9).fill(null);
    this.scorePanel().winner = null;
    this.scorePanel().userIsNext = true;
  }

  isDraw(): boolean {
    return (
      this.boardGamePositions?.filter((el) => el === null)?.length === 0 &&
      !this.scorePanel().winner
    );
  }

  updateWinner(): void {
    this.userWin
      ? (this.scorePanel().userWins += 1)
      : (this.scorePanel().logicWins += 1);
    this.showAlertWinner();
  }

  async showAlertWinner() {
    const { role } = await this.helperService.winnerAlert(
      this.scorePanel().winner,
    );

    if (role === 'cancel') {
      this.init();
      return this.routerCtrl.navigateByUrl('/welcome');
    }
  }

  userMove(index: number): void {
    if (!this.boardGamePositions[index] && !this.scorePanel().winner) {
      this.boardGamePositions.splice(index, 1, this.player);
      this.scorePanel().userIsNext = !this.scorePanel().userIsNext;
    }
    this.scorePanel().winner = this.checkWinner();
    if (this.scorePanel().winner !== null) {
      this.updateWinner();
    }
    if (
      !this.scorePanel().userIsNext &&
      !this.scorePanel().winner &&
      !this.isDraw()
    ) {
      this.helperService.showLoading();
      this.logicMove();
    }
  }

  logicMove(): void {
    const timeout = 500;

    setTimeout(() => {
      const logicPosition = this.avoidUserVictory();

      if (
        !this.boardGamePositions[logicPosition] &&
        !this.scorePanel().winner
      ) {
        this.boardGamePositions.splice(logicPosition, 1, this.player);
        this.scorePanel().userIsNext = !this.scorePanel().userIsNext;
        this.helperService.hideLoading();
      } else {
        this.logicMove();
      }
      this.scorePanel().winner = this.checkWinner();
      if (this.scorePanel().winner !== null) {
        this.updateWinner();
      }
    }, timeout);
  }

  avoidUserVictory(): number {
    for (const position of this.positionsOfWins) {
      const [pos1, pos2, pos3] = position;

      const p1 = this.boardGamePositions[pos1];
      const p2 = this.boardGamePositions[pos2];
      const p3 = this.boardGamePositions[pos3];

      if (p1 && p1 === p2 && !p3) {
        return pos3;
      }
      if (p1 && p1 === p3 && !p2) {
        return pos2;
      }
      if (p2 && p2 === p3 && !p1) {
        return pos1;
      }
    }

    return this.logicRadomMove();
  }

  logicRadomMove(): number {
    // fix issue
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
