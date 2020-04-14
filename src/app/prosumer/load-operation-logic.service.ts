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
        const value = asset.shiftingPotential[minRow][maxLeftBoundaryShift];
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

  static schedule(asset: Load, timeStep: number, amount: number, currentTime: number) {

    let diff = Math.round((amount - asset.scheduledGeneration[timeStep]) * 100) / 100;
    if (diff < 0) {
      asset.shiftingPotential[timeStep][timeStep] = asset.shiftingPotential[timeStep][timeStep] + diff;
      if (timeStep < asset.shiftingPotential.length - 1) {
        asset.shiftingPotential[timeStep][timeStep + 1] = asset.shiftingPotential[timeStep][timeStep + 1] - diff;
        asset.scheduledGeneration[timeStep + 1] = Math.round( (asset.scheduledGeneration[timeStep + 1] - diff) * 100) / 100;
      } else {
        asset.shiftingPotential[timeStep][timeStep - 1] = asset.shiftingPotential[timeStep][timeStep - 1] - diff;
        asset.scheduledGeneration[timeStep - 1] = Math.round((asset.scheduledGeneration[timeStep - 1] - diff) * 100) / 100;
      }
      asset.scheduledGeneration[timeStep] = amount;
    } else {
      console.log('diff: ' + diff);
      // get shifted potential back first
      let minColumn = timeStep - asset.temporalShiftingCapability;
      if (minColumn < 0) { minColumn = 0; }
      let maxColumn = timeStep + asset.temporalShiftingCapability;
      if (maxColumn > asset.shiftingPotential.length) { maxColumn = asset.shiftingPotential.length - 1; }

      let minColumnCopy = minColumn;
      while (minColumnCopy <= maxColumn && diff > 0) {
        if (minColumnCopy !== timeStep && asset.shiftingPotential[timeStep][minColumnCopy] !== undefined) {
          if (asset.shiftingPotential[timeStep][minColumnCopy] > 0) {
            if (asset.shiftingPotential[timeStep][minColumnCopy] >= diff) {
              asset.shiftingPotential[timeStep][minColumnCopy] = asset.shiftingPotential[timeStep][minColumnCopy] - diff;
              asset.scheduledGeneration[minColumnCopy] = asset.scheduledGeneration[minColumnCopy] - diff;

              asset.shiftingPotential[timeStep][timeStep] = asset.shiftingPotential[timeStep][timeStep] + diff;
              asset.scheduledGeneration[timeStep] = asset.scheduledGeneration[timeStep] + diff;

              diff = 0;
            } else {

              asset.scheduledGeneration[minColumnCopy] =
                asset.scheduledGeneration[minColumnCopy] - asset.shiftingPotential[timeStep][minColumnCopy];
              asset.scheduledGeneration[timeStep] =
                asset.scheduledGeneration[timeStep] + asset.shiftingPotential[timeStep][minColumnCopy];
              diff = Math.round((diff - asset.shiftingPotential[timeStep][minColumnCopy]) * 100) / 100;

              asset.shiftingPotential[timeStep][timeStep] =
                asset.shiftingPotential[timeStep][timeStep] + asset.shiftingPotential[timeStep][minColumnCopy];
              asset.shiftingPotential[timeStep][minColumnCopy] = 0;
            }
          }
        }
        minColumnCopy += 1;
      }

      // obtain lacking potential from leftmost entries i.e. entries with lesser row index
      let minRow = timeStep - asset.temporalShiftingCapability;
      if (minRow < 0) { minRow = 0; }
      let maxRow = timeStep + asset.temporalShiftingCapability;
      if (maxRow > asset.scheduledGeneration.length) { maxRow = asset.scheduledGeneration.length; }
      while (minRow <= maxRow) {
        minColumnCopy = minColumn;
        while (diff > 0 && minColumnCopy <= maxColumn) {
          console.log('diff still not 0, but ' + diff + ' finding new entry to take from');
          if (minColumn !== timeStep && asset.shiftingPotential[minRow][minColumnCopy] !== undefined) {

            console.log('sollte hier landen');
            if (asset.shiftingPotential[minRow][minColumnCopy] > 0) {
              if (asset.shiftingPotential[minRow][minColumnCopy] >= diff) {
                asset.shiftingPotential[minRow][minColumnCopy] = Math.round((asset.shiftingPotential[minRow][minColumnCopy] - diff) * 100) / 100;
                asset.scheduledGeneration[minColumnCopy] = Math.round( (asset.scheduledGeneration[minColumnCopy] - diff) * 100) / 100;

                asset.shiftingPotential[minRow][timeStep] = asset.shiftingPotential[minRow][timeStep] + diff;
                asset.scheduledGeneration[timeStep] = asset.scheduledGeneration[timeStep] + diff;

                diff = 0;
              } else {
                asset.scheduledGeneration[minColumnCopy] =
                  Math.round( (asset.scheduledGeneration[minColumnCopy] - asset.shiftingPotential[minRow][minColumnCopy]) * 100) / 100;
                asset.scheduledGeneration[timeStep] =
                  asset.scheduledGeneration[timeStep] + asset.shiftingPotential[minRow][minColumnCopy];

                diff = Math.round((diff - asset.shiftingPotential[minRow][minColumnCopy]) * 100) / 100;

                asset.shiftingPotential[minRow][timeStep] =
                  asset.shiftingPotential[minRow][timeStep] + asset.shiftingPotential[timeStep][minColumnCopy];
                asset.shiftingPotential[minRow][minColumnCopy] = 0;
              }
            }
          }
          minColumnCopy += 1;
        }
        minRow += 1;
      }
    }
  }

}
