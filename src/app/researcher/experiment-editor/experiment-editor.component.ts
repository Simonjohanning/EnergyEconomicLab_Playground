import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MockEDMService} from '../../core/mock-edm.service';
import {ProsumerEditorComponent} from '../prosumer-editor/prosumer-editor.component';
import {P2pMarketdesignEditorComponent} from '../p2p-marketdesign-editor/p2p-marketdesign-editor.component';

@Component({
  selector: 'app-experiment-editor',
  templateUrl: './experiment-editor.component.html',
  styleUrls: ['./experiment-editor.component.css']
})
//TODO check if AfterViewInit hook is needed despite external triggering
export class ExperimentEditorComponent implements OnInit {

  @ViewChild(ProsumerEditorComponent) prosumerEditor: ProsumerEditorComponent;
  @ViewChild(P2pMarketdesignEditorComponent) p2pmdEditor: P2pMarketdesignEditorComponent;

  constructor(private edmService: MockEDMService) { }

  ngOnInit() {
  }

  submitExperimentDesign(): void {
    this.edmService.addExperimentDescription({
      prosumers: this.prosumerEditor.prosumerList,
      p2pMarketDesign: this.p2pmdEditor.preliminaryP2PMarketDesign
    });
  }
}
