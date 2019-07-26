import { Injectable } from '@angular/core';
import {ControllableGenerator} from '../core/data-types/ControllableGenerator';

@Injectable({
  providedIn: 'root'
})
export class AssetOperationLogicService {

  constructor() { }

  static deriveMinimalGenerationCG(asset: ControllableGenerator, timeStepToCheck: number): number{
    let minimalGeneration: number;
    // do all validity checks
    if (timeStepToCheck > 0) {
      //check for ramping parameter stuff
      minimalGeneration = asset.scheduledGeneration[timeStepToCheck - 1] - (asset.rampingParameter * asset.maximalGeneration);
      //check for minimal downtime validity
      if (asset.scheduledGeneration[timeStepToCheck - 1] === 0) {
        if (timeStepToCheck < asset.minimalDowntime){
          this.maxGenerationRange = 0;
        } else {
          // for (let i = asset.minimalDowntime; i > 0; i--){
          //   if (timeStepToCheck - i] !== 0){
          //     maxGenerationRange = 0;
          //   }
          // }
        }
      }
      //check for maximal uptime validity
    }
    return minimalGeneration;
  }

  static deriveMaximalGenerationCG(asset: ControllableGenerator, timeStepToCheck: number): number {
    let maximalGeneration: number;
    return maximalGeneration;
  }
  //   if (this.maxGenerationRange < this.minGenerationRange) {
  //     this.minGenerationRange = this.maxGenerationRange;
  //   }
  //   if (this.minGenerationRange > this.maxGenerationRange) {
  //     this.maxGenerationRange = this.minGenerationRange;
  //   }
  //   return minimalGeneration;
  // }
}
