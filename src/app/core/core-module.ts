import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
//  declarations: [WelcomeComponent, TimeComponent],
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
//    SharedModule
  ],
  exports: [],
//  exports: [TimeComponent],
  providers: []
//  providers: [ExperimentStateService, TimeService]
})
export class CoreModule { }
