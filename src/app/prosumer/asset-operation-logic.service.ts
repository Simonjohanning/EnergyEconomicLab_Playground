import { Injectable } from '@angular/core';
import { ControllableGenerator } from '../core/data-types/ControllableGenerator';
import { StorageUnit } from '../core/data-types/StorageUnit';
import { Load } from '../core/data-types/Load';

@Injectable({
  providedIn: 'root'
})

// TODO whole class a mess that needs to be implemented badly!
export class AssetOperationLogicService {

  private maxGenerationRange = 0;
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
  //   if (this.maxGenerationRange < this.minGenerationRange) {
  //     this.minGenerationRange = this.maxGenerationRange;
  //   }
  //   if (this.minGenerationRange > this.maxGenerationRange) {
  //     this.maxGenerationRange = this.minGenerationRange;
  //   }
  //   return minimalGeneration;
  // }

  /** returns the maximum possible value for charging storage unit from a time step on */
  static deriveMaxChargeStorage(asset: StorageUnit, timeStep: number) {
    return asset.storageCapacity - Math.max(...asset.scheduledGeneration.slice(timeStep));
  }

  /** returns minimum value of remaining scheduled storage that can be discharged from a time step on */
  static deriveMaxDischargeStorage(asset: StorageUnit, timeStep: number) {
    return -Math.min(...asset.scheduledGeneration.slice(timeStep));
  }

  static deriveMaxLoadOperationValue(asset: Load, time: number) {
    // TODO nicht mehr einspeisen als max(schedule) und nicht mehr ausspeisen als min(schedule)

    let maxLeftBoundaryShift = time - asset.temporalShiftingCapability;
    if (maxLeftBoundaryShift < 0) {
      maxLeftBoundaryShift = 0;
    }
    let maxRightBoundaryShift = time + asset.temporalShiftingCapability;
    while (asset.getScheduledGenerationAtTime(maxRightBoundaryShift) === undefined) {
      maxRightBoundaryShift = maxRightBoundaryShift - 1;
    }
    let sumShiftingPotentialAtPointInTime = 0;
    while (maxLeftBoundaryShift <= maxRightBoundaryShift) {

      // only surrounding loads have an influence
      let minRow = time - asset.temporalShiftingCapability;
      if (minRow < 0) { minRow = 0; }
      while (minRow < maxRightBoundaryShift) {
        const value = asset.getShiftingPotentialAtTime(minRow)[maxLeftBoundaryShift];
        if (value !== undefined) {
          sumShiftingPotentialAtPointInTime += value;
        }
        minRow += 1;
      }
      maxLeftBoundaryShift += 1;
    }
    console.log('sumShiftingPot = ' + sumShiftingPotentialAtPointInTime);
    return (asset.getLoad(time) * (1 - asset.relativeControllability)) + sumShiftingPotentialAtPointInTime;
  }

  /** returns the value scheduled value minus the one that can be shifted away */
  static deriveMinLoadOperationValue(asset: Load, time: number) {
    return (asset.getLoad(time) * (1 - asset.relativeControllability));
  }
}
