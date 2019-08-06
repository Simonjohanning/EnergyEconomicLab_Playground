import { Component, OnInit } from '@angular/core';
import {ExperimentStateService} from '../core/experiment-state.service';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  // TODO settle on experiment description strategy and formalism; make everything consistent with regards to this

  private experimentId: number;
  private passedTime: number;
  private editorToShow: string;

  constructor(
    private state: ExperimentStateService) { }

  ngOnInit() {
    this.experimentId = this.state.experimentID;
    this.passedTime = this.state.experimentTime;
    this.editorToShow = 'DesignEditor';
  }

  proceedTime(): void {
    this.state.proceedTime(1);
  }
}
