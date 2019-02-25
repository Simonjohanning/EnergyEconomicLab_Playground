import {Component, OnInit} from '@angular/core';
import {ExperimentStateService} from '../experiment-state.service';
import {MockEDMService} from '../mock-edm.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  private experimentLength: Observable<number>;
  private experimentTime: number;
  constructor(private state: ExperimentStateService,
              private edmLayer: MockEDMService) { }

  ngOnInit() {
    this.experimentLength = this.edmLayer.getExperimentLength();
    this.experimentTime = this.state.experimentTime;
  }

}
