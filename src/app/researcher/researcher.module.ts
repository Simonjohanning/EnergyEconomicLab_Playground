import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherComponent } from './researcher.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core-module';
import { ProsumerEditorComponent } from './prosumer-editor/prosumer-editor.component';
import { P2pMarketdesignEditorComponent } from './p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadEditorComponent } from './load-editor/load-editor.component';
import { StorageEditorComponent } from './storage-editor/storage-editor.component';
import { CGEditorComponent } from './cgeditor/cgeditor.component';
import { NCGEditorComponent } from './ncgeditor/ncgeditor.component';
import { ExperimentDescriptionEditorComponent } from './experiment-description-editor/experiment-description-editor.component';
import { ExperimentInstanceEditorComponent } from './experiment-instance-editor/experiment-instance-editor.component';
import { ProsumerDataEditorComponent } from './prosumer-data-editor/prosumer-data-editor.component';

@NgModule({
  declarations: [
    ResearcherComponent,
    ProsumerEditorComponent,
    P2pMarketdesignEditorComponent,
    LoadEditorComponent,
    StorageEditorComponent,
    CGEditorComponent,
    NCGEditorComponent,
    ExperimentDescriptionEditorComponent,
    ExperimentInstanceEditorComponent,
    ProsumerDataEditorComponent
  ],
  exports: [
    LoadEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ResearcherModule { }
