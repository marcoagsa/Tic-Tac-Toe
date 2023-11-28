import { Routes } from '@angular/router';

export const POSITIONS_OF_WINS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const TIMEOUT: number = 500;

export const MY_ROUTES: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('../components/welcome/welcome.component').then(
        (m) => m.WelcomeComponent,
      ),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('../components/game/game.component').then((m) => m.GameComponent),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];
