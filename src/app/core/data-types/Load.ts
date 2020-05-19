import { DispatchableAsset } from './DispatchableAsset';
import { LoadOperationLogicService } from '../../prosumer/load-operation-logic.service';

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
    // this.scheduledGeneration = Array.from({length: experimentLength}, () => Math.floor(Math.random() * 300) / 100);
    this.scheduledGeneration = Array.from({length: experimentLength}, () => 1);
    this.loadProfile = this.scheduledGeneration.slice();
    this.initiateShiftingPotential(experimentLength);
  }

  /**
   * Initiate arrays based on a randomized standard load profile
   */
  public initiateRandomizedSLP() {
    this.scheduledGeneration = [338.5, 233.2, 172.5, 158.2, 154.0, 156.5, 187.5, 360.3, 517.6, 534.0, 492.8, 464.9, 473.3, 522.8,
      517.9, 461.4, 419.3, 420.9, 514.6, 664.7, 748.2, 672.9, 563.9, 466.7, 345.6, 233.2, 172.5, 158.2, 154.0, 156.5, 187.5,
      360.3, 517.6, 534.0, 492.8, 464.9, 473.3, 522.8, 517.9, 461.4, 419.3, 420.9, 514.6, 664.7, 748.2, 672.9, 563.9, 466.7,
      345.6, 233.2, 172.5, 158.2, 154.0, 156.5, 187.5, 360.3, 517.6, 534.0, 492.8, 464.9, 473.3, 522.8, 517.9, 461.4, 419.3,
      420.9, 514.6, 664.7, 748.2, 672.9, 563.9, 466.7, 345.6, 233.2, 172.5, 158.2, 154.0, 156.5, 187.5, 360.3, 517.6, 534.0,
      492.8, 464.9, 473.3, 522.8, 517.9, 461.4, 419.3, 420.9, 514.6, 664.7, 748.2, 672.9, 563.9, 466.7, 345.6, 233.2, 172.5,
      158.2, 154.0, 156.5, 187.5, 360.3, 517.6, 534.0, 492.8, 464.9, 473.3, 522.8, 517.9, 461.4, 419.3, 420.9, 514.6, 664.7,
      748.2, 672.9, 563.9, 466.7, 345.6, 268.2, 211.6, 168.4, 158.8, 153.9, 160.3, 212.4, 327.8, 478.8, 566.8, 591.4, 620.0,
      666.4, 663.3, 613.8, 575.1, 579.0, 722.0, 837.6, 840.5, 687.8, 536.4, 490.0, 415.7, 312.7, 225.1, 180.3, 164.6, 154.9,
      154.5, 163.8, 200.0, 354.1, 554.0, 696.7, 811.1, 826.8, 692.1, 544.5, 466.4, 426.8, 502.8, 625.6, 705.1, 640.5, 542.1,
      459.0, 338.5]; // winter
    /* this.scheduledGeneration = [432.3, 294.4, 219.3, 199.1, 187.5, 195.2, 237.0, 391.6, 518.9, 566.5, 576.3, 557.0, 567.8, 631.2,
      610.8, 527.1, 475.1, 459.1, 490.0, 568.7, 660.6, 666.3, 630.1, 578.0, 448.3, 294.4, 219.3, 199.1, 187.5, 195.2, 237.0,
      91.6, 518.9, 566.5, 576.3, 557.0, 567.8, 631.2, 610.8, 527.1, 475.1, 459.1, 490.0, 568.7, 660.6, 666.3, 630.1, 578.0,
      448.3, 294.4, 219.3, 199.1, 187.5, 195.2, 237.0, 391.6, 518.9, 566.5, 576.3, 557.0, 567.8, 631.2, 610.8, 527.1, 475.1,
      459.1, 490.0, 568.7, 660.6, 666.3, 630.1, 578.0, 448.3, 294.4, 219.3, 199.1, 187.5, 195.2, 237.0, 391.6, 518.9, 566.5,
      576.3, 557.0, 567.8, 631.2, 610.8, 527.1, 475.1, 459.1, 490.0, 568.7, 660.6, 666.3, 630.1, 578.0, 448.3, 294.4, 219.3,
      199.1, 187.5, 195.2, 237.0, 391.6, 518.9, 566.5, 576.3, 557.0, 567.8, 631.2, 610.8, 527.1, 475.1, 459.1, 490.0, 568.7,
      660.6, 666.3, 630.1, 578.0, 448.3, 332.0, 257.3, 209.3, 200.1, 202.0, 206.6, 254.8, 372.4, 513.5, 623.0, 659.4, 684.5,
      728.5, 703.9, 628.7, 593.5, 579.3, 595.8, 666.0, 721.5, 691.6, 615.3, 594.4, 498.6, 358.4, 266.6, 217.9, 202.4, 199.9,
      195.1, 205.3, 278.0, 449.8, 641.0, 746.4, 822.9, 837.8, 701.5, 576.3, 497.5, 433.5, 438.2, 506.6, 608.1, 637.7, 602.0,
      560.8, 432.3]; // summer */
    /* this.scheduledGeneration = [375.9, 266.4, 196.7, 177.1, 172.4, 176.2, 210.5, 371.7, 518.9, 549.9, 543.8, 528.2, 533.0, 598.4,
      582.6, 507.1, 453.6, 424.6, 465.3, 579.4, 687.7, 672.2, 623.8, 542.8, 401.0, 266.4, 196.7, 177.1, 172.4, 176.2, 210.5,
      371.7, 518.9, 549.9, 543.8, 528.2, 533.0, 598.4, 582.6, 507.1, 453.6, 424.6, 465.3, 579.4, 687.7, 672.2, 623.8, 542.8,
      401.0, 266.4, 196.7, 177.1, 172.4, 176.2, 210.5, 371.7, 518.9, 549.9, 543.8, 528.2, 533.0, 598.4, 582.6, 507.1, 453.6,
      424.6, 465.3, 579.4, 687.7, 672.2, 623.8, 542.8, 401.0, 266.4, 196.7, 177.1, 172.4, 176.2, 210.5, 371.7, 518.9, 549.9,
      543.8, 528.2, 533.0, 598.4, 582.6, 507.1, 453.6, 424.6, 465.3, 579.4, 687.7, 672.2, 623.8, 542.8, 401.0, 266.4, 196.7,
      177.1, 172.4, 176.2, 210.5, 371.7, 518.9, 549.9, 543.8, 528.2, 533.0, 598.4, 582.6, 507.1, 453.6, 424.6, 465.3, 579.4,
      687.7, 672.2, 623.8, 542.8, 401.0, 292.6, 225.2, 185.8, 175.1, 172.6, 180.6, 234.3, 373.0, 518.7, 601.5, 653.1, 687.3,
      725.5, 709.8, 645.1, 594.7, 586.1, 637.5, 733.1, 792.2, 721.5, 589.3, 554.3, 466.0, 337.1, 248.8, 195.5, 177.1, 172.7,
      173.1, 182.9, 262.2, 444.9, 638.1, 740.3, 820.7, 831.2, 674.5, 545.0, 484.1, 429.2, 447.0, 550.2, 643.7, 619.0, 575.7,
      510.5, 375.9]; // transition season: spring or autumn */

    LoadOperationLogicService.randomizeSLP(this);
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
