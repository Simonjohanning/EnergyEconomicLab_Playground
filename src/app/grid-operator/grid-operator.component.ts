import { Component, OnInit } from '@angular/core';
import {ExperimentStateService} from '../core/experiment-state.service';

@Component({
  selector: 'app-grid-operator',
  templateUrl: './grid-operator.component.html',
  styleUrls: ['./grid-operator.component.css']
})

/**
 * The Grid operator component is the top component for the grid operator view and functionality.
 * For the first prototype version of the LabChain, no grid operator functionality is included, and this is more of a dummy component
 */
export class GridOperatorComponent implements OnInit {

  private experimentId: number;

  constructor(
    private ess: ExperimentStateService) { }

  ngOnInit() {
    this.experimentId = this.ess.experimentID;
  }

}
