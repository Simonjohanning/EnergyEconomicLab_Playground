import { Component, OnInit } from '@angular/core';
// import {ExperimentStateService} from '../core/experiment-state.service';

@Component({
  selector: 'app-grid-operator',
  templateUrl: './grid-operator.component.html',
  styleUrls: ['./grid-operator.component.css']
})

export class GridOperatorComponent implements OnInit {

  private experimentId: number;

  constructor(
    //private ess: ExperimentStateService)
  ) { }

  ngOnInit() {
    //this.experimentId = this.ess.experimentID;
    this.experimentId = 123456;
  }

}
