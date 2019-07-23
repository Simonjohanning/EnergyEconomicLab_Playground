import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherComponent } from './researcher.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import { ExperimentEditorComponent } from '../researcher/experiment-editor/experiment-editor.component';
import { ProsumerEditorComponent } from '../researcher/prosumer-editor/prosumer-editor.component';
import { P2pMarketdesignEditorComponent } from '../researcher/p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ResearcherComponent, ExperimentEditorComponent, ProsumerEditorComponent, P2pMarketdesignEditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResearcherModule { }
