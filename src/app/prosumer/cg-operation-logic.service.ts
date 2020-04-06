import { Injectable } from '@angular/core';
import { ControllableGenerator } from '../core/data-types/ControllableGenerator';

@Injectable({
  providedIn: 'root'
})

// TODO whole class a mess that needs to be implemented badly!
export class CGOperationLogicService {

  constructor() { }

  static deriveMinimalGenerationCG(asset: ControllableGenerator, timeStepToCheck: number): number {
    let minimalGeneration: number;
    // do all validity checks
    if (timeStepToCheck > 0 && asset.scheduledGeneration !== undefined) {
      // check for ramping parameter stuff
      minimalGeneration = asset.scheduledGeneration[timeStepToCheck - 1] - (asset.rampingParameter * asset.maximalGeneration);
      // check for minimal downtime validity
      if (asset.scheduledGeneration[timeStepToCheck - 1] === 0) {
        // if (timeStepToCheck < asset.minimalDowntime){
        //   this.maxGenerationRange = 0;
        // } else {
        //   // for (let i = asset.minimalDowntime; i > 0; i--){
        //   if (timeStepToCheck - i] !== 0){
        //     maxGenerationRange = 0;
        //   }
        // }
        // }
      }
      // check for maximal uptime validity
    }
    return minimalGeneration;
  }

  // TODO implement
  static deriveMaximalGenerationCG(asset: ControllableGenerator, timeStepToCheck: number): number {
    return asset.maximalGeneration;
  }

}
