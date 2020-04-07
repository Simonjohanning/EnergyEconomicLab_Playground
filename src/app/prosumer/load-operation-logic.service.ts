import { Injectable } from '@angular/core';
import { Load } from '../core/data-types/Load';

@Injectable({
  providedIn: 'root'
})


export class LoadOperationLogicService {

  /**
   * Returns the maximum shiftable value at a given time step.
   *
   * @param asset The load that is shifted
   * @param timeStep The time step of the shift
   * @param currentTime The time progressed during the experiment
   */
  static deriveMaxLoadOperationValue(asset: Load, timeStep: number, currentTime: number) {
    let maxLeftBoundaryShift = this.getLeftBoundary(asset, timeStep, currentTime);
    const maxRightBoundaryShift =  this.getRightBoundary(asset, timeStep);

    let sumShiftingPotential = 0;
    while (maxLeftBoundaryShift <= maxRightBoundaryShift) {

      // only surrounding loads have an influence
      let minRow = this.getLeftBoundary(asset, timeStep, currentTime);
      while (minRow < maxRightBoundaryShift) {
        const value = asset.getShiftingPotentialAtTime(minRow)[maxLeftBoundaryShift];
        if (value !== undefined) {
          sumShiftingPotential += value;
        }
        minRow += 1;
      }
      maxLeftBoundaryShift += 1;
    }
    // TODO auslagern der rowsums?
    console.log('sumShiftingPot = ' + sumShiftingPotential);
    return (asset.getLoad(timeStep) * (1 - asset.relativeControllability)) + sumShiftingPotential;
  }

  /** returns the value scheduled value minus the one that can be shifted away
   *
   * @param asset The load under consideration
   * @param timeStep The time step of the shift
   */
  static deriveMinLoadOperationValue(asset: Load, timeStep: number) {
    return (asset.getLoad(timeStep) * (1 - asset.relativeControllability));
  }

  private static getLeftBoundary(asset: Load, timeStep: number, currentTime: number): number {
    let leftBoundary = timeStep - asset.temporalShiftingCapability;
    if (leftBoundary < currentTime) {
      leftBoundary = currentTime;
    }
    return leftBoundary;
  }

  private static getRightBoundary(asset: Load, timeStep: number): number {
    let rightBoundary = timeStep + asset.temporalShiftingCapability;
    if (rightBoundary > asset.scheduledGeneration.length - 1) {
      rightBoundary = asset.scheduledGeneration.length - 1;
    }
    return rightBoundary;
  }

}
