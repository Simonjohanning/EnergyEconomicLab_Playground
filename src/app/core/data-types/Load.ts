import {DispatchableAsset} from './DispatchableAsset';

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
  constructor(
    readonly model: string,
    readonly loadProfile: number[],
    readonly relativeControllability: number,
    readonly temporalShiftingCapability: number
  ) {
    super(model);
    this.recentFlexibilityUse = false;
    this.currentLoad = loadProfile[0];
  }

  public getCurrentLoad(currentTime: number): number {
    return this.currentLoad;
  }

  public adaptLoad(timeProfile: number[]): boolean {
    if (this.validLoadProfile(timeProfile)) { return true;
    } else { return false; }
  }

  public validLoadProfile(timeProfile: number[]): boolean {
    // TODO specify
    return false;
  }
}
