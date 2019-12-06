import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProsumerComponent} from './prosumer/prosumer.component';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {GridOperatorComponent} from './grid-operator/grid-operator.component';
import {PublicActorComponent} from './public-actor/public-actor.component';
import { ResearcherComponent } from './researcher/researcher.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcomePage', pathMatch: 'full' },
  { path: 'welcomePage', component: WelcomeComponent },
  { path: 'ProsumerView/:id', component: ProsumerComponent },
  { path: 'PublicActorView', component: PublicActorComponent },
  { path: 'ExperimentDesignerView', component: ResearcherComponent },
  { path: 'GridOperatorView', component: GridOperatorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
