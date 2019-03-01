import { Injectable } from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {MockEDMService} from './mock-edm.service';
import {map} from 'rxjs/operators';
import {TimeRegime} from './data-types/TimeRegime';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private currentTime: number;
  public timeEmitter: Subject<number> = new Subject<number>();
  private endTime: number;
  constructor(private edmService: MockEDMService) {
    this.currentTime = 0;
    this.edmService.getTimeRegime().subscribe(timeRegime => {
      console.log('time regime set to ' + timeRegime);
      if (timeRegime === TimeRegime.DISCRETE) {
        this.discretePeriodicEmittance(this.edmService.getTimeStepLength());
      } else if (timeRegime === TimeRegime.CONTINUOUS) {
        this.continuousPeriodicEmittance(this.edmService.getAccellerationFactor());
      } else {
        console.error('Time Regime ' + timeRegime + ' is invalid!!!');
      }
    });
    this.edmService.getExperimentLength().subscribe(expLength => this.endTime = expLength);
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }
  public advanceTime(amount: number): void {
    if (amount > 0) {
      this.currentTime += amount;
      this.timeEmitter.next(this.currentTime);
    }
  }

  private discretePeriodicEmittance(timeStepLength: Observable<number>) {
    timeStepLength.subscribe(stepLength => {
          const intervalCounter = interval(1000 * stepLength);
          console.log(intervalCounter);
          intervalCounter.subscribe(nextStep => {
            if (this.endTime) {
              if (this.currentTime < this.endTime) {
                this.advanceTime(1);
              }
            }
          });
    });
  }

  private continuousPeriodicEmittance(accellerationFactor: Observable<number>) {
    accellerationFactor.subscribe(accFac => {
      const intervalCounter = interval(100);
      intervalCounter.subscribe(nextStep => {
        if (this.endTime) {
          if (this.currentTime < this.endTime) {
            this.advanceTime(accFac / 10);
          }
        }
      });
    });
  }
}
