import { Injectable } from '@angular/core';
import { ControllableGenerator } from '../core/data-types/ControllableGenerator';
import {TimeService} from '../core/time.service';

@Injectable({
  providedIn: 'root'
})

export class CGOperationLogicService {

  constructor() {
  }

  /**
   * Returns the minimal possible generation of the controllable generator at a given time step with respect to the progressed time in the experiment.
   *
   * @param asset The controllable generator currently operated
   * @param timeStep The time under consideration
   * @param currentTime The current time of the experiment
   */
  static deriveMinimalGenerationCG(asset: ControllableGenerator, timeStep: number, currentTime: number): number {
    let minimalGeneration: number;

    if (timeStep > 0 && asset.scheduledGeneration !== undefined) {
      // obtain number of time steps since last downtime/uptime
      const possibleTimeStepsBack = CGOperationLogicService.getPossibleTimeStepsBack(asset, timeStep, currentTime);

      // get generation at last up or down time and calculate minimum generation
      minimalGeneration = asset.scheduledGeneration[timeStep - possibleTimeStepsBack] - possibleTimeStepsBack * (asset.rampingParameter * asset.maximalGeneration);
      if (minimalGeneration < 0) {
        return 0;
      } else {
        return minimalGeneration;
      }
    } else {
      return undefined;
    }
  }

  /**
   * Returns the maximal possible generation of the controllable generator at a given time step with respect to the progressed time in the experiment.
   *
   * @param asset The controllable generator currently operated
   * @param timeStep The time under consideration
   * @param currentTime The current time of the experiment
   */
  static deriveMaximalGenerationCG(asset: ControllableGenerator, timeStep: number, currentTime: number): number {
    let maximalGeneration: number;

    if (timeStep > 0 && asset.scheduledGeneration !== undefined) {
      // obtain number of time steps since last downtime/uptime
      const possibleTimeStepsBack = CGOperationLogicService.getPossibleTimeStepsBack(asset, timeStep, currentTime);

      // get generation at last up or down time and calculate maximum generation
      maximalGeneration = asset.scheduledGeneration[timeStep - possibleTimeStepsBack] + possibleTimeStepsBack * (asset.rampingParameter * asset.maximalGeneration);
      if (maximalGeneration > asset.maximalGeneration) {
        return maximalGeneration;
      } else {
        return maximalGeneration;
      }
    } else {
      return undefined;
    }
  }

  /**
   * Returns the number of time steps to last down or up time. If there has not been any scheduling it should return the current time.
   *
   * @param asset The controllable generator currently operated
   * @param schedulingTime The time under consideration
   * @param currentTime The current time of the experiment
   */
  private static getPossibleTimeStepsBack(asset: ControllableGenerator, schedulingTime: number, currentTime: number): number {
    let numberStepsBack = 0;
    let timeCopy = schedulingTime;

    while (asset.ramping[timeCopy] === 'r' && timeCopy > currentTime) {
      numberStepsBack += 1;
      timeCopy -= 1;
    }

    return numberStepsBack;
  }

  public static schedule(asset: ControllableGenerator, timeStep: number, dispatchValue: number, currentTime: number) {

    // TODO work with possible steps back
    const currentGeneration = asset.scheduledGeneration[timeStep];
    let timeStepCopy = timeStep - 1;
    // checking validity
    while (timeStepCopy >= 0 && asset.scheduledGeneration[timeStepCopy] === currentGeneration) {
      timeStepCopy = timeStepCopy - 1;
    }
    // generator was ramped down
    if (asset.ramping[timeStep] === 'x') {
      console.error('cannot schedule ' + dispatchValue + ' at time step ' + timeStep + ' as ' + asset.model + ' is still in minimal up or down time');
    } else {
      // still ramping up
      if (asset.scheduledGeneration[timeStep - 1] < dispatchValue && asset.ramping[timeStep - 1] === '+') {
        asset.ramping[timeStep] = '+';
        // TODO check validity i.e. t-1 + rampParameter >= dispatchValue
        asset.scheduledGeneration[timeStep] = dispatchValue;
        for (let i = timeStep + 1; i <= timeStep + asset.minimalUptime; i++) {
          asset.ramping[i] = 'x';
        }
        // TODO schedule to the end
      } else
        // still ramping down
      if (asset.scheduledGeneration[timeStep - 1] > dispatchValue && asset.ramping[timeStep - 1] === '-') {
        asset.ramping[timeStep] = '-';
        for (let i = timeStep + 1; i <= timeStep + asset.minimalDowntime; i++) {
          asset.ramping[i] = '-';
        }
        // TODO schedule to the end
      } else {
        if (dispatchValue > currentGeneration) {

          // this.scheduledGeneration[timeStep] = dispatchValue;
          let startRampingTime = timeStep;
          let diff = dispatchValue;
          while (diff > 0) {
            diff = Math.round((diff - (asset.maximalGeneration * asset.rampingParameter)) * 100) / 100;
            startRampingTime = startRampingTime - 1;
          }

          // start ramping up
          const gradient = (dispatchValue - asset.scheduledGeneration[startRampingTime]) / (timeStep - startRampingTime); // y/x
          console.log('blubb ' +  gradient);

          let startTime = startRampingTime + 1;
          while (startTime <= timeStep) {
            asset.scheduledGeneration[startTime] = asset.scheduledGeneration[startTime] + (gradient * (startTime - startRampingTime));
            asset.ramping[startTime] = '+';
            startTime++;
          }
          // block ramping
          for (let i = timeStep + 1; i < asset.scheduledGeneration.length; i++) {
            // TODO more logic if we schedule later
            asset.scheduledGeneration[i] = dispatchValue;
            if (i <= timeStep + asset.minimalUptime) {
              asset.ramping[i] = 'x';
            }
          }
        } else {
          // dispatch value is below
          let startRampingTime = timeStep;
          console.log(dispatchValue);
          let diff = -dispatchValue;
          while (startRampingTime > 0) {
            diff = Math.round((diff - (asset.maximalGeneration * asset.rampingParameter)) * 100) / 100;
            startRampingTime = startRampingTime - 1;
          }

          // start ramping up
          const gradient = (dispatchValue - asset.scheduledGeneration[startRampingTime]) / (timeStep - startRampingTime); // y/x

          console.log('gradient is ' +  gradient + ' ' + (timeStep - startRampingTime));

          let startTime = startRampingTime + 1;
          while (startTime <= timeStep) {
            asset.scheduledGeneration[startTime] = asset.scheduledGeneration[startTime] + (gradient * (startTime - startRampingTime));
            asset.ramping[startTime] = '+';
            startTime++;
          }
          // block ramping
          for (let i = timeStep + 1; i < asset.scheduledGeneration.length; i++) {
            // TODO more logic if we schedule later
            asset.scheduledGeneration[i] = dispatchValue;
            if (i <= timeStep + asset.minimalUptime) {
              asset.ramping[i] = 'x';
            }
          }
        }
      }
    }
    console.log(asset.ramping);
  }

}
