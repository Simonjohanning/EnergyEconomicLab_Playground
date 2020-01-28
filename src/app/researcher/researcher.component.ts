import { Component, OnInit } from '@angular/core';
import { ExperimentStateService } from '../core/experiment-state.service';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})

/**
 * Component for the researcher role within the simulation environment.
 * Hosts the children components and allows the user to create new kinds of experiments (Experiment Descriptions),
 * or to create new instances of an existing experiment parameterization (Experiment Instance).
 * Also allow the resercher to supervise an experiment
 */
export class ResearcherComponent implements OnInit {

  // TODO settle on experiment description strategy and formalism; make everything consistent with regards to this
  /** The id of the experiment (if the researcher supervises an active experiment */
  private experimentId: number;
  /** Toggle variable to indicate which editor the user utilizes */
  private editorToShow: string;

  constructor(
    private state: ExperimentStateService) { }

  ngOnInit() {
    this.experimentId = this.state.experimentID;
    this.editorToShow = 'DesignEditor';
  }
}
