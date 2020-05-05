import { DispatchableAsset } from './DispatchableAsset';
import { CGOperationLogicService } from '../../prosumer/cg-operation-logic.service';

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
export class ControllableGenerator extends DispatchableAsset {
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

  // TODO ngdocheck for change of inputs ngAfterContentChecked oder ngAfterViewChecked
  // TODO after content checked, set view parameters again

  /**
   * Initiates scheduling and ramping arrays.
   *
   * @param experimentLength The preset time of the experiment
   */
  public initiateSchedule(experimentLength: number) {
    this.scheduledGeneration = Array.from({length: experimentLength + 1}, () => 0);
    this.ramping = Array.from({length: experimentLength + 1}, () => 'r');
  }

  /**
   * Schedules the generation by setting respective generation values in scheduled generation and blocks duration in ramping array.
   *
   * @param timeStep Time in experiment where generator is dispatched
   * @param dispatchValue Value the generator is dispatched to
   * @param currentTime Progressed time of the experiment
   */
  public scheduleGeneration(timeStep: number, dispatchValue: number, currentTime: number) {
    CGOperationLogicService.schedule(this, timeStep, dispatchValue, currentTime);
  }
}
