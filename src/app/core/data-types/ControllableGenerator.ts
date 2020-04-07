import { DispatchableAsset } from './DispatchableAsset';
import { AfterViewChecked } from '@angular/core';

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
 */
export class ControllableGenerator extends DispatchableAsset implements AfterViewChecked {
  /** A boolean indicating whether the generator is currently generating electricity (true) or is shut down (false) */
  public operationStatus: boolean;
  /** A number indicating the time since the last change of direction of the generated amount (i.e. (non-)increasing or (non-)descreasing generation). More specifically, when the generation gradiant / difference switches signs (0 not considered a switch) */
  public lastOperationStatusSwitch: number;
  /** The amount of electricity the generator produces at the 'current time' */
  public currentGeneration: number;
  /** The time of the last electricity generation recording (when the data point for the lastGenerationAmount property was set) */
  public lastGenerationTime: number;
  /** The generation level of the generator at the time of the last generation level recording */
  public lastGenerationAmount: number;
  /** A time series of the generation history, with entries at the respective time points where it generated (warning: array might be sparse, i.e. contain undefined values) */
  public generationHistory: number[];
  /** ramping contains actions: + for ramping up, - for ramping down, x for down/up time and r for ready */
  public ramping: any[];
  constructor(
    readonly model: string,
    readonly maximalGeneration: number,
    readonly minimalDowntime: number,
    readonly minimalUptime: number,
    readonly rampingParameter: number,
  ) {
    super(model);
  }

  // TODO init stuff in ngoninit
  // TODO ngdocheck for change of inputs ngAfterContentChecked oder ngAfterViewChecked

  // TODO after content checked, set view parameters again

  ngAfterViewChecked(): void {
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

  public initiateSchedule(experimentLength: number) {
    this.scheduledGeneration = Array.from({length: experimentLength + 1}, () => 0);
    this.ramping = Array.from({length: experimentLength + 1}, () => 'r');
  }

  public scheduleGeneration(timeStep: number, dispatchValue: number) {
    // TODO check time!
    // if (timeService.getCurrentTime() > timeStep) {
    //  console.error('chosen time step is prior to current time');
    //  return;
    // }

    const currentGeneration = this.scheduledGeneration[timeStep];
    let timeStepCopy = timeStep - 1;
    // checking validity
    while (timeStepCopy >= 0 && this.scheduledGeneration[timeStepCopy] === currentGeneration) {
      timeStepCopy = timeStepCopy - 1;
    }
    // generator was ramped down
    if (this.ramping[timeStep] === 'x') {
      console.error('cannot schedule ' + dispatchValue + ' at time step ' + timeStep + ' as ' + this.model + ' is still in minimal up or down time');
    } else {
      // still ramping up
      if (this.scheduledGeneration[timeStep - 1] < dispatchValue && this.ramping[timeStep - 1] === '+') {
        this.ramping[timeStep] = '+';
        // TODO check validity i.e. t-1 + rampParameter >= dispatchValue
        this.scheduledGeneration[timeStep] = dispatchValue;
        for (let i = timeStep + 1; i <= timeStep + this.minimalUptime; i++) {
          this.ramping[i] = 'x';
        }
        // TODO schedule to the end
      } else
      // still ramping down
      if (this.scheduledGeneration[timeStep - 1] > dispatchValue && this.ramping[timeStep - 1] === '-') {
        this.ramping[timeStep] = '-';
        for (let i = timeStep + 1; i <= timeStep + this.minimalDowntime; i++) {
          this.ramping[i] = '-';
        }
        // TODO schedule to the end
      } else {
        if (dispatchValue > currentGeneration) {

          // this.scheduledGeneration[timeStep] = dispatchValue;
          let startRampingTime = timeStep;
          let diff = dispatchValue;
          while (diff > 0) {
            diff = Math.round((diff - (this.maximalGeneration * this.rampingParameter)) * 100) / 100;
            startRampingTime = startRampingTime - 1;
          }

          // start ramping up
          const gradient = (dispatchValue - this.scheduledGeneration[startRampingTime]) / (timeStep - startRampingTime); // y/x
          console.log('blubb ' +  gradient);

          let startTime = startRampingTime + 1;
          while (startTime <= timeStep) {
            this.scheduledGeneration[startTime] = this.scheduledGeneration[startTime] + (gradient * (startTime - startRampingTime));
            this.ramping[startTime] = '+';
            startTime++;
          }
          // block ramping
          for (let i = timeStep + 1; i < this.scheduledGeneration.length; i++) {
            // TODO more logic if we schedule later
            this.scheduledGeneration[i] = dispatchValue;
            if (i <= timeStep + this.minimalUptime) {
              this.ramping[i] = 'x';
            }
          }
        } else {
          // dispatch value is below
          let startRampingTime = timeStep;
          console.log(dispatchValue);
          let diff = -dispatchValue;
          while (diff < 0) {
            diff = Math.round((diff - (this.maximalGeneration * this.rampingParameter)) * 100) / 100;
            startRampingTime = startRampingTime - 1;
          }

          // start ramping up
          const gradient = (dispatchValue - this.scheduledGeneration[startRampingTime]) / (timeStep - startRampingTime); // y/x

          console.log('gradient is ' +  gradient + ' ' + (timeStep - startRampingTime));

          let startTime = startRampingTime + 1;
          while (startTime <= timeStep) {
            this.scheduledGeneration[startTime] = this.scheduledGeneration[startTime] + (gradient * (startTime - startRampingTime));
            this.ramping[startTime] = '+';
            startTime++;
          }
          // block ramping
          for (let i = timeStep + 1; i < this.scheduledGeneration.length; i++) {
            // TODO more logic if we schedule later
            this.scheduledGeneration[i] = dispatchValue;
            if (i <= timeStep + this.minimalUptime) {
              this.ramping[i] = 'x';
            }
          }
        }
      }
    }
  }
}
