import {Component, OnInit} from '@angular/core';
import {ExperimentStateService} from '../experiment-state.service';
import {MockEDMService} from '../mock-edm.service';
import {Observable} from 'rxjs';
import {TimeService} from '../time.service';
import {TimeRegime} from '../data-types/TimeRegime';
import {HelperService} from '../helper.service';
import {DataProvisionService} from '../data-provision.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  private experimentLength: Observable<number>;
  private experimentLengthNumber;
  private experimentTime: number;
  private timeRegime;
  private discreteRegime = TimeRegime.DISCRETE;
  private continousRegime = TimeRegime.CONTINUOUS;
  private dateView = new Date(0, 0, 0, 0, 0, 0, 0);
  private progress = 0;
  constructor(private state: ExperimentStateService,
              private edmLayer: MockEDMService,
              private timeService: TimeService,
              private helperService: HelperService) { }

  ngOnInit() {
    this.experimentLength = DataProvisionService.getExperimentLength();
    this.experimentLength.subscribe(time => this.experimentLengthNumber = time);
    this.experimentTime = this.timeService.getCurrentTime();
    this.timeService.timeEmitter.subscribe(newTime => {
      this.experimentTime = newTime;
      this.progress = this.experimentTime / this.experimentLengthNumber;
      // TODO find better way for updating date than this
      this.dateView = new Date(0, 0, 0, 0, 0, 0, 0);
      this.dateView.setSeconds(newTime);
    });
    DataProvisionService.getTimeRegime().subscribe(regime => this.timeRegime = regime);
  }
}
