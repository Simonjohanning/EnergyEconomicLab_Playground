import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherComponent } from './researcher.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import { ExperimentEditorComponent } from '../researcher/experiment-editor/experiment-editor.component';
import { ProsumerEditorComponent } from '../researcher/prosumer-editor/prosumer-editor.component';
import { P2pMarketdesignEditorComponent } from '../researcher/p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadEditorComponent } from './load-editor/load-editor.component';
import { StorageEditorComponent } from './storage-editor/storage-editor.component';
import { CGEditorComponent } from './cgeditor/cgeditor.component';
import { NCGEditorComponent } from './ncgeditor/ncgeditor.component';

@NgModule({
  declarations: [ResearcherComponent, ExperimentEditorComponent, ProsumerEditorComponent, P2pMarketdesignEditorComponent, LoadEditorComponent, StorageEditorComponent, CGEditorComponent, NCGEditorComponent],
  exports: [
    LoadEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResearcherModule { }
