import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherComponent } from './researcher.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [ResearcherComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class ResearcherModule { }
