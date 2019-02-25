import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOperatorComponent } from './grid-operator.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [GridOperatorComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class GridOperatorModule { }
