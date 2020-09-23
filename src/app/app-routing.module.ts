import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from 'src/app/welcome/welcome.component';
import { GameComponent } from 'src/app/game/game.component';
import { ResultsComponent } from 'src/app/results/results.component';

const routes : Routes = [

  {path: "", component: WelcomeComponent },
  {path: "game", component: GameComponent },
  {path: "result", component: ResultsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
