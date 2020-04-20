import { Injectable } from '@angular/core';
import { ControllableGenerator } from '../core/data-types/ControllableGenerator';

@Injectable({
  providedIn: 'root'
})

export class CGOperationLogicService {

  // TODO future ramping might start earlier or later but needs to be recalculated in either case!
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
      // obtain number of time steps since last down or up time
      const possibleTimeStepsBack = CGOperationLogicService.getPossibleTimeStepsBack(asset, timeStep, currentTime);
      // obtain number of time steps to next down or up time considering the minimal down time
      // const possibleTimeStepsToFuture = CGOperationLogicService.getPossibleTimeStepsInFuture(asset, timeStep + asset.minimalDowntime);

      // get generation at last up or down time and calculate minimum generation
      const minimalGenerationPast = asset.scheduledGeneration[timeStep - possibleTimeStepsBack] - possibleTimeStepsBack * (asset.rampingParameter * asset.maximalGeneration);
      // get generation before future ramping and calculate minimum generation
      // let minimalGenerationFuture = 0;
      // if (timeStep + possibleTimeStepsToFuture + asset.minimalDowntime < asset.ramping.length) {
      //   minimalGenerationFuture = asset.scheduledGeneration[timeStep + possibleTimeStepsToFuture + asset.minimalDowntime] - possibleTimeStepsToFuture * (asset.rampingParameter * asset.maximalGeneration);
      // }
      minimalGeneration = Math.max(0, minimalGenerationPast); // , minimalGenerationFuture);
      return minimalGeneration;
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
      // obtain number of time steps that can be taken to next ramping considering the minimal up time
      // const possibleTimeStepsToFuture = CGOperationLogicService.getPossibleTimeStepsInFuture(asset, timeStep + asset.minimalUptime);

      // get generation at last up or down time and calculate maximum generation
      const maximalGenerationPast = asset.scheduledGeneration[timeStep - possibleTimeStepsBack] + possibleTimeStepsBack * (asset.rampingParameter * asset.maximalGeneration);

      // get generation before future ramping and calculate minimum generation
      // let maximalGenerationFuture = asset.maximalGeneration;
      // if (timeStep + possibleTimeStepsToFuture + asset.minimalUptime < asset.ramping.length) {
      //   maximalGenerationFuture = asset.scheduledGeneration[timeStep + possibleTimeStepsToFuture + asset.minimalUptime] + possibleTimeStepsToFuture * (asset.rampingParameter * asset.maximalGeneration);
      //   }
      maximalGeneration = Math.min(asset.maximalGeneration, maximalGenerationPast); // , maximalGenerationFuture);
      return maximalGeneration;
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

  /**
   * Returns the number of time steps that would be free for down time
   *
   * @param asset The controllable generator currently operated
   * @param schedulingTime The time under consideration
   */
  private static getPossibleTimeStepsInFuture(asset: ControllableGenerator, schedulingTime: number): number {
    let numberFutureSteps = 0;
    let timeCopy = schedulingTime;

    while (asset.ramping[timeCopy] === 'r' && timeCopy < asset.ramping.length) {
      numberFutureSteps += 1;
      timeCopy += 1;
    }

    return numberFutureSteps;
  }

  public static schedule(asset: ControllableGenerator, timeStep: number, dispatchValue: number, currentTime: number) {

    // check validity
    if (asset.ramping[timeStep] === 'x') {
      console.error('cannot schedule ' + dispatchValue + ' at time step ' + timeStep + ' as ' + asset.model + ' is still in minimal up or down time');
    } else if (asset.ramping[timeStep] === '+' || asset.ramping[timeStep] === '-') {
      console.error('cannot schedule ' + dispatchValue + ' at time step ' + timeStep + ' as ' + asset.model + ' is still ramping');
    } else {
      let startRampingTime = timeStep;
      let diff = dispatchValue - asset.scheduledGeneration[timeStep];
      // Case 1: ramping up
      if (diff > 0) {
        // this.scheduledGeneration[timeStep] = dispatchValue;

        while (diff > 0) {
          diff = diff - (asset.maximalGeneration * asset.rampingParameter);
          startRampingTime = startRampingTime - 1;
        }

        if (startRampingTime < currentTime) {
          // TODO throw error?
          console.error('ramping start preceeds current time!');
          return;
        }

        // calc gradient given correct starting time
        const gradient = (dispatchValue - asset.scheduledGeneration[startRampingTime]) / (timeStep - startRampingTime); // y/x

        // start ramping up
        let startTime = startRampingTime + 1;
        while (startTime <= timeStep) {
          asset.scheduledGeneration[startTime] = asset.scheduledGeneration[startTime] + (gradient * (startTime - startRampingTime));
          asset.ramping[startTime] = '+';
          startTime++;
        }
        // block ramping
        for (let i = timeStep + 1; i < asset.scheduledGeneration.length; i++) {
          asset.scheduledGeneration[i] = dispatchValue;
          if (i <= timeStep + asset.minimalUptime) {
            asset.ramping[i] = 'x';
          }
        }
      } else {
        // Case 2: ramping down
        while (diff < 0) {
          diff = diff + (asset.maximalGeneration * asset.rampingParameter);
          startRampingTime = startRampingTime - 1;
        }

        if (startRampingTime <= currentTime) {
          // TODO throw error?
          console.error('ramping start preceeds current time!');
          return;
        }

        // calc gradient given correct starting time
        const gradient = (dispatchValue - asset.scheduledGeneration[startRampingTime]) / (timeStep - startRampingTime); // y/x

        // start ramping down
        let startTime = startRampingTime + 1;
        while (startTime <= timeStep) {
          asset.scheduledGeneration[startTime] = asset.scheduledGeneration[startTime] + (gradient * (startTime - startRampingTime));
          asset.ramping[startTime] = '-';
          startTime++;
        }

        // block ramping
        for (let i = timeStep + 1; i < asset.scheduledGeneration.length; i++) {
          asset.scheduledGeneration[i] = dispatchValue;
          if (i <= timeStep + asset.minimalUptime) {
            asset.ramping[i] = 'x';
          }
        }
      }
    }
  }
}

/*
removed code from scheduling at a point in time where cg is still ramping which is code that cannot be reached
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
      }
 */
