import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProsumerComponent} from './prosumer/prosumer.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcomePage', pathMatch: 'full' },
  {path: 'welcomePage', component: WelcomeComponent},
  {path: 'ProsumerView/:id', component: ProsumerComponent}
]

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
