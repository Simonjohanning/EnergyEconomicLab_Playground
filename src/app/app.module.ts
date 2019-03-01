import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {CoreModule} from './core/core.module';
import {ResearcherModule} from './researcher/researcher.module';
import {PublicActorModule} from './public-actor/public-actor.module';
import {GridOperatorModule} from './grid-operator/grid-operator.module';
import {ProsumerModule} from './prosumer/prosumer.module';
import {DataProvisionService} from './core/data-provision.service';
import {ExperimentStateService} from './core/experiment-state.service';
import {TimeService} from './core/time.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    CoreModule,
    ResearcherModule,
    PublicActorModule,
    GridOperatorModule,
    ProsumerModule
  ],
  providers: [DataProvisionService, ExperimentStateService, TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
