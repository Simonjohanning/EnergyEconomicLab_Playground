import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {DataProvisionService} from '../core/data-provision.service';
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
  private hideExperimentEditor: boolean;

  constructor(
    private data: DataProvisionService,
    private state: ExperimentStateService) { }

  ngOnInit() {
    this.experimentId = this.data.experimentId;
    this.passedTime = this.state.experimentTime;
    this.hideExperimentEditor = true;
  }

  proceedTime(): void {
    this.state.proceedTime(1);
  }
}
