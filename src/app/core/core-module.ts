import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
// import { TimeComponent } from './time/time.component';
import { ExperimentStateService } from './experiment-state.service';
import { TimeService } from './time.service';

@NgModule({
//  declarations: [WelcomeComponent, TimeComponent],
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [],
//  exports: [TimeComponent],
  providers: [ExperimentStateService, TimeService]
})
export class CoreModule { }
