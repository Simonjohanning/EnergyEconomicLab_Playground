import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicActorComponent } from './public-actor.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core-module';

@NgModule({
  declarations: [PublicActorComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class PublicActorModule { }
