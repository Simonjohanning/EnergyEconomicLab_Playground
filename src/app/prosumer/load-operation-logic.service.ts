import { Injectable } from '@angular/core';
import { Load } from '../core/data-types/Load';

@Injectable({
  providedIn: 'root'
})


export class LoadOperationLogicService {

  static deriveMaxLoadOperationValue(asset: Load, time: number) {

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
