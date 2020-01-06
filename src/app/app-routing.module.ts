import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridOperatorComponent } from './grid-operator/grid-operator.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcomePage', pathMatch: 'full' },
  { path: 'GridOperatorView', component: GridOperatorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
