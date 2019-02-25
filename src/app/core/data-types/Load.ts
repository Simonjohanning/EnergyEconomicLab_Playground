export class Load {
  private recentFlexibilityUse: boolean;
  private currentLoad: number;
  constructor(
    readonly  model: string,
    readonly loadProfile: number[],
    readonly relativeControllability: number,
    readonly temporalShiftingCapability: number
  ) {
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
