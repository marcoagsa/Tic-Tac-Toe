import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoostergamePage } from './roostergame.page';

const routes: Routes = [
  {
    path: '',
    component: RoostergamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoostergamePageRoutingModule {}
