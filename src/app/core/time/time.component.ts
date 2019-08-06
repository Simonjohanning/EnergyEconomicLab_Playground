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

/**
 * The TimeComponent manages the monitoring of time within the simulation.
 * It is used to display temporal information within the simulation
 *
 */
export class TimeComponent implements OnInit {
  /** Variable to depict the length of the experiment */
  private experimentLength;
  /** Variable to store the time within the experiment (how far it progressed) */
  private experimentTime: number;
  /** Stores the timeRegime (as TimeRegime.DISCRETE or TimeRegime.CONTINUOUS) in order to show the respective component */
  private timeRegime;
  private discreteRegime = TimeRegime.DISCRETE;
  private continousRegime = TimeRegime.CONTINUOUS;
  /** Variable to contain the date to show progress appropriately */
  private dateView = new Date(0, 0, 0, 0, 0, 0, 0);
  /** Variable to hold the progress of the simulation */
  private progress = 0;
  constructor(private state: ExperimentStateService,
              private edmLayer: MockEDMService,
              private timeService: TimeService) { }

  ngOnInit() {
    // Set the length of the experiment with the data obtained from the data provision service
    DataProvisionService.getExperimentLength().subscribe(time => this.experimentLength = time);
    // Obtain the current time from the time service
    this.experimentTime = this.timeService.getCurrentTime();
    // subscribe to the time emitter of the time service to receive updates on the simulation time
    this.timeService.timeEmitter.subscribe(newTime => {
      this.experimentTime = newTime;
      this.progress = this.experimentTime / this.experimentLength;
      // TODO find better way for updating date than this
      // this.dateView = new Date(0, 0, 0, 0, 0, 0, 0);
      this.dateView.setSeconds(newTime);
    });
    // Set the time regime the simulation is configured with
    DataProvisionService.getTimeRegime().subscribe(regime => this.timeRegime = regime);
  }
}
