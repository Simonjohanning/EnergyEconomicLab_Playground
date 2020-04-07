import { Injectable } from '@angular/core';
import { ControllableGenerator } from '../core/data-types/ControllableGenerator';
import {TimeService} from '../core/time.service';

@Injectable({
  providedIn: 'root'
})

// TODO whole class a mess that needs to be implemented badly!
export class CGOperationLogicService {

  private timeServiceSub: TimeService;

  constructor(timeService: TimeService) {
    this.timeServiceSub = timeService;
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
      minimalGeneration = asset.getCurrentGeneration(timeStep - possibleTimeStepsBack) - possibleTimeStepsBack * (asset.rampingParameter * asset.maximalGeneration);
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
      maximalGeneration = asset.getCurrentGeneration(timeStep - possibleTimeStepsBack) + possibleTimeStepsBack * (asset.rampingParameter * asset.maximalGeneration);
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

    while (asset.ramping[schedulingTime] === 'r' && timeCopy > 0) {
      numberStepsBack += 1;
      timeCopy -= 1;
    }

    if (schedulingTime - numberStepsBack < currentTime) {
      return currentTime;
    } else {
      return numberStepsBack;
    }
  }

}
