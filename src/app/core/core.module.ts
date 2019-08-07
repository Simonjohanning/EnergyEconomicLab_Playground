import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { TimeComponent } from './time/time.component';
import {ExperimentStateService} from './experiment-state.service';
import {TimeService} from './time.service';


@NgModule({
  declarations: [WelcomeComponent, TimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [TimeComponent],
  providers: [ExperimentStateService, TimeService]
})
export class CoreModule { }
