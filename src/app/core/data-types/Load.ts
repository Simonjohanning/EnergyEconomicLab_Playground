import { DispatchableAsset } from './DispatchableAsset';

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
  private shiftingPotential: number[][];


  constructor(
    readonly model: string,
    readonly relativeControllability: number,
    readonly temporalShiftingCapability: number
  ) {
    super(model);
    this.recentFlexibilityUse = false;
    this.currentLoad = 0;
  }

  public initiateSchedule(experimentLength: number) {
    this.scheduledGeneration = Array.from({length: experimentLength}, () => Math.floor(Math.random() * 300) / 100);
   // this.scheduledGeneration = Array.from({length: experimentLength + 1}, () => 1);
    this.loadProfile = this.scheduledGeneration.slice();
    this.initiateShiftingPotential(experimentLength);
  }

  public getScheduledGenerationAtTime(currentTime: number): number {
    return this.scheduledGeneration[currentTime];
  }

  /** returns the the shifted potential of requested time */
  public getShiftingPotentialAtTime(time: number): number[] {
    return this.shiftingPotential[time];
  }

  public scheduleGeneration(timeStep: number, amount: number, currentTime: number) {
    // this.scheduledGeneration[timeStep] = amount;
    let diff = Math.round((amount - this.scheduledGeneration[timeStep]) * 100) / 100;
    if (diff < 0) {
      this.shiftingPotential[timeStep][timeStep] = this.shiftingPotential[timeStep][timeStep] + diff;
      if (timeStep < this.loadProfile.length - 1) {
        this.shiftingPotential[timeStep][timeStep + 1] = this.shiftingPotential[timeStep][timeStep + 1] - diff;
        this.scheduledGeneration[timeStep + 1] = Math.round( (this.scheduledGeneration[timeStep + 1] - diff) * 100) / 100;
      } else {
        this.shiftingPotential[timeStep][timeStep - 1] = this.shiftingPotential[timeStep][timeStep - 1] - diff;
        this.scheduledGeneration[timeStep - 1] = Math.round((this.scheduledGeneration[timeStep - 1] - diff) * 100) / 100;
      }
      this.scheduledGeneration[timeStep] = amount;
    } else {
      console.log('diff: ' + diff);
      // get shifted potential back first
      let minColumn = timeStep - this.temporalShiftingCapability;
      if (minColumn < 0) { minColumn = 0; }
      let maxColumn = timeStep + this.temporalShiftingCapability;
      if (maxColumn > this.loadProfile.length) { maxColumn = this.loadProfile.length - 1; }

      let minColumnCopy = minColumn;
      while (minColumnCopy <= maxColumn && diff > 0) {
        if (minColumnCopy !== timeStep && this.shiftingPotential[timeStep][minColumnCopy] !== undefined) {
          if (this.shiftingPotential[timeStep][minColumnCopy] > 0) {
            if (this.shiftingPotential[timeStep][minColumnCopy] >= diff) {
              this.shiftingPotential[timeStep][minColumnCopy] = this.shiftingPotential[timeStep][minColumnCopy] - diff;
              this.scheduledGeneration[minColumnCopy] = this.scheduledGeneration[minColumnCopy] - diff;

              this.shiftingPotential[timeStep][timeStep] = this.shiftingPotential[timeStep][timeStep] + diff;
              this.scheduledGeneration[timeStep] = this.scheduledGeneration[timeStep] + diff;

              diff = 0;
            } else {

              this.scheduledGeneration[minColumnCopy] =
                this.scheduledGeneration[minColumnCopy] - this.shiftingPotential[timeStep][minColumnCopy];
              this.scheduledGeneration[timeStep] =
                this.scheduledGeneration[timeStep] + this.shiftingPotential[timeStep][minColumnCopy];
              diff = Math.round((diff - this.shiftingPotential[timeStep][minColumnCopy]) * 100) / 100;

              this.shiftingPotential[timeStep][timeStep] =
                this.shiftingPotential[timeStep][timeStep] + this.shiftingPotential[timeStep][minColumnCopy];
              this.shiftingPotential[timeStep][minColumnCopy] = 0;
            }
          }
        }
        minColumnCopy += 1;
      }

      // obtain lacking potential from leftmost entries i.e. entries with lesser row index
      let minRow = timeStep - this.temporalShiftingCapability;
      if (minRow < 0) { minRow = 0; }
      let maxRow = timeStep + this.temporalShiftingCapability;
      if (maxRow > this.loadProfile.length) { maxRow = this.loadProfile.length; }
      while (minRow <= maxRow) {
        minColumnCopy = minColumn;
        while (diff > 0 && minColumnCopy <= maxColumn) {
          console.log('diff still not 0, but ' + diff + ' finding new entry to take from');
          if (minColumn !== timeStep && this.shiftingPotential[minRow][minColumnCopy] !== undefined) {

            console.log('sollte hier landen');
            if (this.shiftingPotential[minRow][minColumnCopy] > 0) {
              if (this.shiftingPotential[minRow][minColumnCopy] >= diff) {
                this.shiftingPotential[minRow][minColumnCopy] = Math.round((this.shiftingPotential[minRow][minColumnCopy] - diff) * 100) / 100;
                this.scheduledGeneration[minColumnCopy] = Math.round( (this.scheduledGeneration[minColumnCopy] - diff) * 100) / 100;

                this.shiftingPotential[minRow][timeStep] = this.shiftingPotential[minRow][timeStep] + diff;
                this.scheduledGeneration[timeStep] = this.scheduledGeneration[timeStep] + diff;

                diff = 0;
              } else {
                this.scheduledGeneration[minColumnCopy] =
                  Math.round( (this.scheduledGeneration[minColumnCopy] - this.shiftingPotential[minRow][minColumnCopy]) * 100) / 100;
                this.scheduledGeneration[timeStep] =
                  this.scheduledGeneration[timeStep] + this.shiftingPotential[minRow][minColumnCopy];

                diff = Math.round((diff - this.shiftingPotential[minRow][minColumnCopy]) * 100) / 100;

                this.shiftingPotential[minRow][timeStep] =
                  this.shiftingPotential[minRow][timeStep] + this.shiftingPotential[timeStep][minColumnCopy];
                this.shiftingPotential[minRow][minColumnCopy] = 0;
              }
            }
          }
          minColumnCopy += 1;
        }
        minRow += 1;
      }
    }
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

  private updateShiftingPotential(currentTime: number, shiftedAmountAtTimeStep: number, timeStep: number) {
    let maxLeftEntry = timeStep - this.temporalShiftingCapability;
    if (maxLeftEntry < 0) {
      maxLeftEntry = 0;
    }
    if (maxLeftEntry < currentTime) {
      maxLeftEntry = currentTime;
    }
    let maxRightEntry = timeStep + this.temporalShiftingCapability;
    if (maxRightEntry > this.loadProfile.length) {
      maxRightEntry = this.loadProfile.length;
    }

    if (maxLeftEntry <= maxRightEntry) {
      // TODO this.shiftingPotential[maxLeftEntry] = this.shiftingPotential[maxLeftEntry] - shiftedAmountAtTimeStep;
    }
  }

  private timeUpdate(time: number) {
    // sets time steps that are done to undefined
    this.shiftingPotential.forEach(entry => {
      entry[time] = undefined;
    });
  }

  public getLoad(time: number): number {
    return this.loadProfile[time];
  }

}
