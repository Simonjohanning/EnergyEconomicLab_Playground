export class ControllableGenerator {
  private operationStatus: boolean;
  private lastOperationStatusSwitch: number;
  private currentGeneration: number;
  private lastGenerationTime: number;
  private lastGenerationAmount: number;
  constructor(
    readonly model: string,
    readonly maximalGeneration: number,
    readonly minimalDowntime: number,
    readonly minimalUptime: number,
    readonly rampingParameter: number,
    readonly heatCouplingNumber: number
  ) {}

  /**
   * Method that sets the generation of the generator if the requested generation
   * is within the technical boundaries of the generator.
   *
   * @param requestedGeneration The amount of electricity the generator is desired to generate from the current time until changed
   * @param currentTime The system time at which the generator is to be set
   */
  public setGeneration(requestedGeneration: number, currentTime: number): boolean {
    if (currentTime < this.lastGenerationTime) {
      return false;
    } else if (this.checkGeneration(requestedGeneration)) {
      this.lastGenerationAmount = this.currentGeneration;
      this.currentGeneration = requestedGeneration;
      this.lastGenerationTime = currentTime;
      if (this.operationStatus && (requestedGeneration === 0)) {
        this.lastOperationStatusSwitch = currentTime;
        this.operationStatus = false;
      } else if (!this.operationStatus && (requestedGeneration > 0)) {
        this.lastOperationStatusSwitch = currentTime;
        this.operationStatus = true;
      }
      return true;
    } else { return false; }
  }

  private checkGeneration(requestedGeneration: number) {
    if (this.operationStatus && (requestedGeneration === 0) && (this.minimalUptime < this.lastOperationStatusSwitch)) {
      return false;
    } else if (!this.operationStatus && (requestedGeneration > 0) && (this.minimalDowntime < this.lastOperationStatusSwitch)) {
      return false;
    } else if (Math.abs(this.currentGeneration - requestedGeneration) > (this.maximalGeneration * this.rampingParameter)) {
      return false;
    }
  }

  public getCurrentGeneration(currentTime: number): number {
    // still ramping
    if (Math.abs(currentTime - this.lastGenerationTime) * this.rampingParameter < Math.abs(this.lastGenerationAmount - this.currentGeneration)) {
      if (this.lastGenerationAmount < this.currentGeneration) {
        return (this.lastGenerationAmount + (currentTime - this.lastGenerationTime) * this.rampingParameter);
      } else {
        return (this.lastGenerationAmount - (currentTime - this.lastGenerationTime) * this.rampingParameter);
      }
    } else {
      return this.currentGeneration;
    }
  }
}
