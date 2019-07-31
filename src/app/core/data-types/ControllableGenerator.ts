import {DispatchableAsset} from './DispatchableAsset';

/**
 * Representation of a controllable generator as energy generation asset.
 * Controllable means in this context that the generation of the asset can be arbitrarily, within technical bounds, be controlled by the operator.
 * The ControllableGenerator is a DispatchableAsset, i.e. it can be scheduled for generation.
 *
 * @param model The model, as a descriptive string
 * @param maximalGeneration The maximal generation the generator can be ramped up to (in kW)
 * @param minimalDowntime The amount of time (relative to the simulation time regime) the generator can't be operated once it was lowered
 * @param minimalUptime The amount of time (relativ to the simulation time regime) the generator can't be operated once it was ramped up
 * @param rampingParameter Technical parameter that describes the speed at which the asset increases or decreases generation (in %/time step)
 * @param heatCouplingNumber The amount of heat energy generated for a unit of generated electrical energy
 */
export class ControllableGenerator extends DispatchableAsset {
  public operationStatus: boolean;
  public lastOperationStatusSwitch: number;
  public currentGeneration: number;
  public lastGenerationTime: number;
  public lastGenerationAmount: number;
  public generationHistory: number[];
  constructor(
    readonly model: string,
    readonly maximalGeneration: number,
    readonly minimalDowntime: number,
    readonly minimalUptime: number,
    readonly rampingParameter: number,
    readonly heatCouplingNumber: number
  ) {
    super(model);
  }

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
      this.generationHistory[currentTime] = requestedGeneration;
      return true;
    } else { return false; }
  }

  /**
   * Method to check whether the asset can be operated at a certain generation level at the next time step
   *
   * @param requestedGeneration The generation level to check validity for
   * @returns boolean value informing whether the requested generation level is technically suitable
   */
  private checkGeneration(requestedGeneration: number): boolean {
    if (this.operationStatus && (requestedGeneration === 0) && (this.minimalUptime < this.lastOperationStatusSwitch)) {
      return false;
    } else if (!this.operationStatus && (requestedGeneration > 0) && (this.minimalDowntime < this.lastOperationStatusSwitch)) {
      return false;
    } else if (Math.abs(this.currentGeneration - requestedGeneration) > (this.maximalGeneration * this.rampingParameter)) {
      return false;
    }
  }

  /**
   * Method to return the generation of the asset at a given time point
   *
   * @param currentTime The time point at which to check the current generation of the asset
   * @returns The current generation level (current in the sense of the provided parameter)
   */
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
