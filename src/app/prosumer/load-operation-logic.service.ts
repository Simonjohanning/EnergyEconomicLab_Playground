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
    // not necessary to consider shifted potential as they have no influence on the minimal value of not shiftable load!
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

  /**
   * Schedules the load shift.
   *
   * @param asset Load that is being shifted.
   * @param timeStep Time of shift.
   * @param amount New load value
   * @param currentTime The progressed time in the experiment.
   */
  static schedule(asset: Load, timeStep: number, amount: number, currentTime: number) {

    let diff = Math.round((amount - asset.scheduledGeneration[timeStep]) * 100) / 100;

    if (diff === 0) {
      return;
    } else if (diff < 0) {
      // shift away
      this.shiftAway(asset, timeStep, diff, currentTime);
    } else {
      // shift towards

      // 1. get shifted potential back first
      diff = this.retrieveShiftedPotential(asset, timeStep, diff, currentTime);

      // 2. get shiftable potential from time steps within temporal shifting capability

      // obtain lacking potential from leftmost entries i.e. entries with lesser row index
      const maxColumn = this.getRightBoundary(asset, timeStep);
      let minColumn = this.getLeftBoundary(asset, timeStep, currentTime);

      let minRow = this.getLeftBoundary(asset, timeStep, currentTime);
      const maxRow = this.getRightBoundary(asset, timeStep);
      while (minRow <= maxRow) {
        minColumn = this.getLeftBoundary(asset, timeStep, currentTime);
        while (diff > 0 && minColumn <= maxColumn) {
          if (minColumn !== timeStep && asset.shiftingPotential[minRow][minColumn] !== undefined) {

            if (asset.shiftingPotential[minRow][minColumn] > 0) {
              if (asset.shiftingPotential[minRow][minColumn] >= diff) {
                asset.shiftingPotential[minRow][minColumn] = Math.round((asset.shiftingPotential[minRow][minColumn] - diff) * 100) / 100;
                asset.scheduledGeneration[minColumn] = Math.round( (asset.scheduledGeneration[minColumn] - diff) * 100) / 100;

                asset.shiftingPotential[minRow][timeStep] = asset.shiftingPotential[minRow][timeStep] + diff;
                asset.scheduledGeneration[timeStep] = asset.scheduledGeneration[timeStep] + diff;

                diff = 0;
              } else {
                asset.scheduledGeneration[minColumn] =
                  Math.round( (asset.scheduledGeneration[minColumn] - asset.shiftingPotential[minRow][minColumn]) * 100) / 100;
                asset.scheduledGeneration[timeStep] =
                  asset.scheduledGeneration[timeStep] + asset.shiftingPotential[minRow][minColumn];

                diff = Math.round((diff - asset.shiftingPotential[minRow][minColumn]) * 100) / 100;

                asset.shiftingPotential[minRow][timeStep] =
                  asset.shiftingPotential[minRow][timeStep] + asset.shiftingPotential[timeStep][minColumn];
                asset.shiftingPotential[minRow][minColumn] = 0;
              }
            }
          }
          minColumn += 1;
        }
        minRow += 1;
      }
    }
  }

  private static retrieveShiftedPotential(asset, timeStep, diff, currentTime): number {
    const maxColumn = this.getRightBoundary(asset, timeStep);
    let minColumn = this.getLeftBoundary(asset, timeStep, currentTime);

    // calculate row
    let sum = 0;
    while (minColumn <= maxColumn) {
      if (minColumn !== timeStep && asset.shiftingPotential[timeStep][minColumn] !== undefined) {
        sum += asset.shiftingPotential[timeStep][minColumn];
      }
      minColumn++;
    }

    // relative shift
    let relativeShift = 1;
    if (sum < diff) {
      relativeShift = sum / diff;
    }

    // resetting minColumn
    minColumn = this.getLeftBoundary(asset, timeStep, currentTime);

    // shift back potentials relative to the potential shifted to timeStep
    while (minColumn <= maxColumn) {
      if (minColumn !== timeStep && asset.shiftingPotential[timeStep][minColumn] !== undefined) {
        // account for rounding errors
        const amountShiftedBack = Math.min(Math.round((asset.shiftingPotential[timeStep][minColumn] * relativeShift * 100) / 100), diff);

        // shift potential back
        asset.shiftingPotential[timeStep][minColumn] -= amountShiftedBack;
        asset.shiftingPotential[timeStep][timeStep] += amountShiftedBack;

        // calculate new difference
        diff -= amountShiftedBack;
      }
      minColumn++;
    }

    return diff;
  }

  /**
   * Schedules the shift away from a given time step
   *
   * @param asset Load of the shifted amount
   * @param timeStep Time step the shift is scheduled to
   * @param diff Difference to the original value
   * @param currentTime The progressed time of the experiment
   */
  private static shiftAway(asset: Load, timeStep: number, diff: number, currentTime: number) {

    // 1. shift back all potential shifted here
    let sum = 0;

    let leftBoundary = this.getLeftBoundary(asset, timeStep, currentTime);
    const rightBoundary = this.getRightBoundary(asset, timeStep);

    // calculate sum of all potential shifted to timeStep
    while (leftBoundary <= rightBoundary) {
      if (leftBoundary !== timeStep) {
        sum += asset.shiftingPotential[leftBoundary][timeStep];
      }
      leftBoundary++;
    }

    if (sum > 0) {
      let relativeShift = 1;
      if (sum < diff) {
        relativeShift = sum / diff;
      }

      // reset leftBoundary
      leftBoundary = this.getLeftBoundary(asset, timeStep, currentTime);

      // shift back potentials relative to the potential shifted to timeStep
      while (leftBoundary <= rightBoundary) {
        // account for rounding errors
        const amountShiftedBack = Math.min(Math.round((asset.shiftingPotential[leftBoundary][timeStep] * relativeShift * 100) / 100), -diff);

        if (leftBoundary !== timeStep) {
          // shift potential back
          asset.shiftingPotential[leftBoundary][timeStep] -= amountShiftedBack;
          asset.shiftingPotential[leftBoundary][leftBoundary] += amountShiftedBack;

          // calculate new difference
          diff += amountShiftedBack;
        }
        leftBoundary++;
      }

      if (diff === 0) {
          return;
      }
    }

    // 2. basic step: push difference to next time step

    // shiftingPotential[timeStep][timeStep] <= diff < 0
    asset.scheduledGeneration[timeStep] += diff;
    asset.shiftingPotential[timeStep][timeStep] += diff;

    if (timeStep < asset.shiftingPotential.length - 1) {
      asset.shiftingPotential[timeStep][timeStep + 1] = Math.round ((asset.shiftingPotential[timeStep][timeStep + 1] - diff) * 100) / 100;
      asset.scheduledGeneration[timeStep + 1] = Math.round( (asset.scheduledGeneration[timeStep + 1] - diff) * 100) / 100;
    } else {
      // TODO catch error earlier?
      console.error('tried to shift to non-existing time step');
      return;
    }

  }

}
