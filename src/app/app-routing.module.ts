import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridOperatorComponent } from './grid-operator/grid-operator.component';
import { ProsumerComponent } from './prosumer/prosumer.component';
import { WelcomeComponent } from './core/welcome/welcome.component';
import { PublicActorComponent } from './public-actor/public-actor.component';
import { ResearcherComponent } from './researcher/researcher.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcomePage', pathMatch: 'full' },
  { path: 'GridOperatorView', component: GridOperatorComponent },
  { path: 'welcomePage', component: WelcomeComponent },
  { path: 'ProsumerView/:id', component: ProsumerComponent },
  { path: 'PublicActorView', component: PublicActorComponent },
  { path: 'ExperimentDesignerView', component: ResearcherComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
