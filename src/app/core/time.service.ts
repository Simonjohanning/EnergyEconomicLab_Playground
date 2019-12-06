import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import {MockEDMService} from './mock-edm.service';
import { TimeRegime } from './data-types/TimeRegime';
import { DataProvisionService } from './data-provision.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to manage and provide temporal information related with the experiment
 */
export class TimeService {
  /** Variable to store the time */
  private currentTime: number;
  /** A subject to notify observers about temporal updates */
  public timeEmitter: Subject<number> = new Subject<number>();
  /** The end time of the simulation */
  private endTime: number;
  constructor() {
    this.currentTime = 0;
    // Set the respective time emitter to notify observers within the correct time regime
    DataProvisionService.getTimeRegime().subscribe(timeRegime => {
      console.log('time regime set to ' + timeRegime);
      if (timeRegime === TimeRegime.DISCRETE) {
        this.discretePeriodicEmittance(DataProvisionService.getTimeStepLength());
      } else if (timeRegime === TimeRegime.CONTINUOUS) {
        this.continuousPeriodicEmittance(DataProvisionService.getAccellerationFactor());
      } else {
        console.error('Time Regime ' + timeRegime + ' is invalid!!!');
      }
    });
    DataProvisionService.getExperimentLength().subscribe(expLength =>
      this.endTime = expLength
    );
  }

  /**
   * Method to provide the current time of the service within the experiment
   *
   * @returns The time point of the service relative to the respective time regime
   */
  public getCurrentTime(): number {
    return this.currentTime;
  }

  /**
   * Method to advance the time in the simulation and notify all observers
   *
   * @param amount The amount the time should progress
   */
  public advanceTime(amount: number): void {
    if (amount > 0) {
      this.currentTime += amount;
      this.timeEmitter.next(this.currentTime);
    }
  }

  /**
   * Method to emit the time periodically within a discrete temporal scheme
   * Using the time emitter, the time is advanced by 1 step until the end time of the simulation is used every timeStepLength seconds
   *
   * @param timeStepLength An observable of the length of a time step within the discrete time regime (i.e. how many seconds each step should last)
   */
  private discretePeriodicEmittance(timeStepLength: Observable<number>) {
    timeStepLength.subscribe(stepLength => {
          const intervalCounter = interval(1000 * stepLength);
          console.log(intervalCounter);
          intervalCounter.subscribe(nextStep => {
            if (this.currentTime === 0) {
              this.timeEmitter.next(0);
            }
            if (this.endTime) {
              if (this.currentTime < this.endTime) {
                this.advanceTime(1);
              }
            }
          });
    });
  }

  /**
   * Method to emit the time periodically within a continuous temporal scheme
   * Using the time emitter, the time is advanced by the accellerationFactor until the end time of the simulation every second (to be more exact, the even is emitted every 100ms by a tenth of the accelleratioNFactor)
   *
   * @param accellerationFactor An observable of the factor by which the simulation is to be sped up from realtime (=1: progression in real-time)
   */
  private continuousPeriodicEmittance(accellerationFactor: Observable<number>) {
    accellerationFactor.subscribe(accFac => {
      const intervalCounter = interval(100);
      intervalCounter.subscribe(nextStep => {
        if (this.endTime) {
          if (this.currentTime < this.endTime) {
            this.advanceTime(accFac / 10.0);
          }
        }
      });
    });
  }

  /**
   * Method to provide the end time of the simulation
   *
   * @returns The end time of the simulation
   */
  public getEndTime(): number {
    return this.endTime;
  }
}
