import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonFooter, IonGrid } from '@ionic/angular/standalone';
import { POSITIONS_OF_WINS, TIMEOUT } from 'src/app/constants';
import { HelpService } from 'src/app/services/help.service';
import { ScorePanel } from 'src/app/interfaces';
import { ScoreHeaderComponent } from '../score-header/score-header.component';
import { BoardComponent } from '../board/board.component';
import { ButtonComponent } from '../button/button.component';

const imports = [
  IonContent,
  IonGrid,
  IonFooter,
  ScoreHeaderComponent,
  BoardComponent,
  ButtonComponent,
];

@Component({
  selector: 'app-game',
  standalone: true,
  imports,
  template: `
    <ion-content [fullscreen]="true" class="ion-padding" scrollY="false">
      <ion-grid fixed>
        <app-score-header [scorePanel]="scorePanel()" [player]="player" />
        @if (!disableBoard) {
          <app-board
            [disabled]="disableBoard"
            [boardGamePositions]="boardGamePositions()"
            (triggerClick)="userMove($event)"
          />
        } @else {
          <app-board
            [disabled]="disableBoard"
            [boardGamePositions]="boardGamePositions()"
            (triggerClick)="userMove($event)"
          />
        }
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-padding">
      <app-button
        [label]="stopGame"
        [color]="'danger'"
        (triggerClick)="navigateTo()"
      />
      <app-button
        [label]="selectIcon"
        [disabled]="disableButton"
        [color]="'warning'"
        (triggerClick)="iconPick()"
      />
      <app-button
        [label]="startGame"
        [disabled]="disableButton"
        (triggerClick)="initGame()"
      />
    </ion-footer>
  `,
  styles: `
    ion-grid {
      display: grid;
      gap: 10px;
    }

    ion-grid.ios {
      padding-top: 10%;
    }

    ion-footer {
      display: flex;
      justify-content: space-between;
      padding-bottom: 50px;
    }
  `,
})
export class GameComponent implements OnInit {
  readonly startGame: string = 'New Game';
  readonly selectIcon: string = 'Change Icon';
  readonly stopGame: string = 'Stop Game';
  readonly positionsOfWins = POSITIONS_OF_WINS;
  public boardGamePositions = signal<number[]>(new Array(9).fill(null));

  private helperService = inject(HelpService);
  private routerCtrl = inject(Router);

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
    return !this.scorePanel().winner && !this.isDraw;
  }

  get disableBoard() {
    return !!this.scorePanel().winner || this.isDraw;
  }

  get userWin() {
    return this.scorePanel().winner === this.scorePanel().userIcon;
  }

  get isDraw() {
    return (
      this.boardGamePositions()?.filter((el) => el === null)?.length === 0 &&
      !this.scorePanel().winner
    );
  }

  get winnerOrDraw() {
    this.scorePanel().winner = this.checkWinner();
    return this.scorePanel().winner || this.isDraw;
  }

  async ngOnInit() {
    await this.iconPick();
    this.initGame();
  }

  async iconPick() {
    const { data } = await this.helperService.openModal();

    if (!data) {
      return;
    }
    this.scorePanel().userIcon = data;
    this.scorePanel().logicIcon = data === 2 ? 1 : 2;
  }

  navigateTo() {
    this.initGame();
    this.routerCtrl.navigateByUrl('/welcome');
  }

  async initGame() {
    this.boardGamePositions.update((items) => items.fill(null));
    this.scorePanel().winner = null;
    this.whoStarts();
  }

  whoStarts() {
    this.scorePanel().userIsNext = !this.scorePanel().userIsNext;

    if (!this.scorePanel().userIsNext) {
      this.logicMove();
    }
  }

  updateWinner(): void {
    if (!this.isDraw) {
      this.userWin
        ? (this.scorePanel().userWins += 1)
        : (this.scorePanel().logicWins += 1);
    }
    this.showAlertWinner();
  }

  changePlayer() {
    this.scorePanel().userIsNext = !this.scorePanel().userIsNext;
  }

  async showAlertWinner() {
    const whoWon = this.userWin
      ? 'You'
      : this.isDraw
        ? 'Draw / Tie'
        : 'Your Mobile';
    const { role } = await this.helperService.winnerAlert(
      this.scorePanel().winner,
      whoWon,
    );

    if (role === 'cancel') {
      this.initGame();
      return this.routerCtrl.navigateByUrl('/welcome');
    }
  }

  userMove(position: number) {
    if (this.boardGamePositions()[position]) {
      return;
    }

    this.addPosition(position);
    if (this.winnerOrDraw) {
      this.updateWinner();
    } else {
      this.changePlayer();
      this.logicMove();
    }
  }

  async logicMove() {
    if (this.winnerOrDraw) {
      this.updateWinner();
    } else {
      await this.helperService.showLoading();
      let logicPosition = this.avoidUserVictory();
      setTimeout(async () => {
        if (!this.boardGamePositions()[logicPosition]) {
          this.addPosition(logicPosition);
        } else {
          logicPosition = this.findAvailablePosition();
          this.addPosition(logicPosition);
        }

        await this.helperService.hideLoading();
        this.winnerOrDraw ? this.updateWinner() : this.changePlayer();
      }, TIMEOUT);
    }
  }

  addPosition(position: number) {
    this.boardGamePositions().splice(position, 1, this.player);
  }

  avoidUserVictory(): number {
    for (const position of this.positionsOfWins) {
      const [pos1, pos2, pos3] = position;

      const p1 = this.boardGamePositions()[pos1];
      const p2 = this.boardGamePositions()[pos2];
      const p3 = this.boardGamePositions()[pos3];

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

  findAvailablePosition(): number {
    return this.boardGamePositions().findIndex((el) => el === null);
  }

  logicRadomMove(): number {
    let pos: number[] = [];
    for (const [index, value] of this.boardGamePositions().entries()) {
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
        this.boardGamePositions()[a] &&
        this.boardGamePositions()[a] === this.boardGamePositions()[b] &&
        this.boardGamePositions()[a] === this.boardGamePositions()[c]
      ) {
        return this.boardGamePositions()[a];
      }
    }
    return null;
  }
}
