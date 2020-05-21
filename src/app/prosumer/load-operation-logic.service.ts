import { Injectable } from '@angular/core';
import { Load } from '../core/data-types/Load';

@Injectable({
  providedIn: 'root'
})


export class LoadOperationLogicService {

  /**
   * Randomizes the standard load profile at initiation by shuffling around existing loads
   *
   * @param asset Load that is initiated
   */
  // TODO this needs testing
  static randomizeSLP(asset: Load) {
    let i;
    let j;

    for (let repeats = 0; repeats < 1000; repeats++) {
      i = Math.round(Math.random() * asset.scheduledGeneration.length);
      j = Math.round(Math.random() * asset.scheduledGeneration.length);
      if (i !== j && i !== 0 && j !== 0) {
        const shift = asset.scheduledGeneration[i] * 0.01;
        asset.scheduledGeneration[i] -= shift;
        asset.scheduledGeneration[i] += shift;
      }
    }
  }

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

    // shiftable potential is all potential that was either moved from timeStep and can be moved back or
    // all potential within the temporal shifting capabilities that have not been moved to timeStep!
    let sumShiftingPotential = 0;
    while (maxLeftBoundaryShift <= maxRightBoundaryShift) {
      sumShiftingPotential += this.getRowSum(asset, timeStep, currentTime, maxLeftBoundaryShift);
      maxLeftBoundaryShift += 1;
    }
    return asset.scheduledGeneration[timeStep] + sumShiftingPotential;
  }

  /**
   * Sums up all shiftable entries given a fixed row by ignoring all potential that is already at the time step.
   *
   * @param asset Load under consideration
   * @param timeStep Time in the experiment under consideration
   * @param currentTime The progressed time in the experiment
   * @param row Fixed column
   */
  private static getRowSum(asset: Load, timeStep: number, currentTime: number, row: number): number {
    let sum = 0;
    let minColumn = this.getLeftBoundary(asset, timeStep, currentTime);
    const maxRightBoundaryShift =  this.getRightBoundary(asset, timeStep);

    while (minColumn <= maxRightBoundaryShift) {
      const value = asset.shiftingPotential[row][minColumn];
      if (value !== undefined && minColumn !== timeStep) {
        sum += value;
      }
      minColumn += 1;
    }
    return sum;
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
      this.shiftLoadFromOtherTimeSteps(asset, timeStep, diff, currentTime);

    }
  }

  /**
   * Shifts load from other time steps to a certain time step
   *
   * @param asset Load where shift occurs
   * @param timeStep The time step load is shifted to
   * @param diff The load difference that has to be filled up
   * @param currentTime The time that has already progressed in the experiment
   */
  private static shiftLoadFromOtherTimeSteps(asset: Load, timeStep: number, diff: number, currentTime: number) {
    // diff > 0!

    // obtain lacking potential from leftmost entries i.e. entries with lesser row index
    let minColumn: number;
    let minRow = this.getLeftBoundary(asset, timeStep, currentTime);
    const maxTimeStep = this.getRightBoundary(asset, timeStep);

    // 1. obtain sum of shiftable potential

    // shiftable potential is all potential that was either moved from timeStep and can be moved back or
    // all potential within the temporal shifting capabilities that have not been moved to timeStep!
    let sumShiftingPotential = 0;
    while (minRow <= maxTimeStep) {
      sumShiftingPotential += this.getRowSum(asset, timeStep, currentTime, minRow);
      minRow++;
    }

    // resetting minRow
    minRow =  this.getLeftBoundary(asset, timeStep, currentTime);

    // 2. calc relative shift
    // relative shift
    // sum >= diff!
    const relativeShift = diff / sumShiftingPotential;

    // 3. shift relative to sum of shiftable potential
    while (minRow <= maxTimeStep) {
      minColumn = this.getLeftBoundary(asset, timeStep, currentTime);
      while (minColumn <= maxTimeStep) {
        if (minRow !== timeStep && minColumn !== timeStep && asset.shiftingPotential[minRow][minColumn] !== undefined) {
          const shiftValue =  asset.shiftingPotential[minRow][minColumn] * relativeShift;
          asset.shiftingPotential[minRow][minColumn] -= shiftValue;
          asset.scheduledGeneration[minColumn] -= shiftValue;

          asset.shiftingPotential[minRow][timeStep] += shiftValue;
          asset.scheduledGeneration[timeStep] += shiftValue;
        }
        minColumn += 1;
      }
      minRow += 1;
    }
  }

  /**
   * Intermediate step for shift to a certain time step that retrieves all potential that has been previously shifted away
   *
   * @param asset Load that is shifted
   * @param timeStep Time step that load is shifted to
   * @param diff The difference between old and new scheduled amount
   * @param currentTime The time progressed to far in the experiment
   *
   * @return The remaining difference in load that has to be still shifted
   */
  private static retrieveShiftedPotential(asset, timeStep, diff, currentTime): number {
    const maxColumn = this.getRightBoundary(asset, timeStep);
    let minColumn = this.getLeftBoundary(asset, timeStep, currentTime);

    // calculate row sums
    let sum = 0;
    while (minColumn <= maxColumn) {
      if (minColumn !== timeStep && asset.shiftingPotential[timeStep][minColumn] !== undefined) {
        sum += asset.shiftingPotential[timeStep][minColumn];
      }
      minColumn++;
    }

    // resetting minColumn
    minColumn = this.getLeftBoundary(asset, timeStep, currentTime);
    console.log(minColumn + ' left boundary');

    // shift back potentials relative to the potential shifted to timeStep
    while (minColumn <= maxColumn) {
      if (minColumn !== timeStep && asset.shiftingPotential[timeStep][minColumn] !== undefined) {

        // relative shift
        let relativeShift = 1;
        if (sum > 0) {
          relativeShift = asset.shiftingPotential[timeStep][minColumn] / sum;
        }

        const amountShiftedBack = Math.min(asset.shiftingPotential[timeStep][minColumn] * relativeShift, diff);

        // shift potential back
        asset.shiftingPotential[timeStep][minColumn] -= amountShiftedBack;
        asset.scheduledGeneration[minColumn] -= amountShiftedBack;
        asset.shiftingPotential[timeStep][timeStep] += amountShiftedBack;
        asset.scheduledGeneration[timeStep] += amountShiftedBack;

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

    // calculate relative shift
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
          // asset.scheduledGeneration[timeStep] -= amountShiftedBack;
          asset.shiftingPotential[leftBoundary][leftBoundary] += amountShiftedBack;
          // asset.scheduledGeneration[leftBoundary] += amountShiftedBack;

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
