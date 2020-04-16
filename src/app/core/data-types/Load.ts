import { DispatchableAsset } from './DispatchableAsset';
import {LoadOperationLogicService} from '../../prosumer/load-operation-logic.service';

/**
 * An asset that represents a load, where the use of electricity is interpreted as negative generation.
 * While it has a predetermined load curve, it offers some flexibility in load shifting, i.e. can be understood as a dispatchable asset
 * Its semantics (as private variables) are derived from the context, and its use should be restricted to one of these semantic contexts only
 *
 * @params model: The model description string of the load
 * @params loadProfile: The preset basic load profile of the load, with consumption set for each time step
 * @params relativeControllability The amount of deviation the load profile is allowed for the respective load (as a fractional value)
 * @params temporalShiftingCapability The amount of time that electricity consumption can be foregone (i.e. the fraction of the load can be shifted to a later point in time
 */
export class Load extends DispatchableAsset {
  /** A boolean indicating whether the load was used as a (technical) flexibility recently (relative to the semantics of the context it is used in) */
  private recentFlexibilityUse: boolean;
  /** The amount of electricity the load uses at the respective time point it is considered at */
  readonly currentLoad: number;
  /** An array that remains untouched */
  private loadProfile: number[];
  /** An array containing the shifting potential of each time step */
  shiftingPotential: number[][];


  constructor(
    readonly model: string,
    readonly relativeControllability: number,
    readonly temporalShiftingCapability: number
  ) {
    super(model);
    this.recentFlexibilityUse = false;
    this.currentLoad = 0;
  }

  /**
   * Initiates all essential arrays with respect to the length of the experiment
   *
   * @param experimentLength Length of the experiment
   */
  public initiateSchedule(experimentLength: number) {
    this.scheduledGeneration = Array.from({length: experimentLength}, () => Math.floor(Math.random() * 300) / 100);
    this.loadProfile = this.scheduledGeneration.slice();
    this.initiateShiftingPotential(experimentLength);
  }

  /**
   * Schedules load shift at a given time step to a certain amount of energy
   */
  public scheduleGeneration(timeStep: number, amount: number, currentTime: number) {
    LoadOperationLogicService.schedule(this, timeStep, amount, currentTime);
  }

  private initiateShiftingPotential(experimentLength: number) {
    this.shiftingPotential = Array<Array<number>>();

    for (let i = 0; i <= experimentLength; i++) {
      const row: number[] = new Array<number>(experimentLength + 1);
      row.fill(undefined);
      this.shiftingPotential.push(row);
    }

    this.shiftingPotential.forEach((entry, index) => {
      if (index !== 0) {
      // only right/left shifts initialized with 0
      let minIndex = index - this.temporalShiftingCapability;
      if (minIndex < 0) {
        minIndex = 0;
      }
      let maxIndex = index + this.temporalShiftingCapability;
      if (maxIndex > experimentLength) {
        maxIndex = experimentLength;
      }

      while (minIndex <= maxIndex) {
        // zero-th time step is already done
        if (minIndex === 0) {
          this.shiftingPotential[index][minIndex] = undefined;
        }
        if (minIndex !== index && minIndex !== 0) {
          this.shiftingPotential[index][minIndex] = 0;
        } else {
          this.shiftingPotential[index][index] = this.loadProfile[index] * this.relativeControllability;
        }
        minIndex += 1;
      }}
    });
  }

  // TODO implement
  private timeUpdate(time: number) {
    // sets time steps that are done to undefined
    this.shiftingPotential.forEach(entry => {
      entry[time] = undefined;
    });
    // TODO also for shiftingPotential[time] = Array of undefined entries!
  }

  public getLoad(time: number): number {
    return this.loadProfile[time];
  }

}
