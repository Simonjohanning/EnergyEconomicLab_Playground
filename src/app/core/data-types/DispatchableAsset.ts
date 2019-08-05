import {TimeService} from '../time.service';

/**
 * Superclass for all assets whose generation / consumption of energy can be changed arbitrarily (at least to some degree), i.e. that can be dispatched.
 * Allows to schedule the generation / consumption (as negative generation) of the respective assets.
 * Semantics of the scheduling and asset operation need to be implemented with the respective asset.
 *
 * @param model The string describing the model of the respective asset
 */
export class DispatchableAsset {

  public scheduledGeneration: number[];

  // TODO think about whether to encapsulate timeService in here (better checking, but shouldn't be part of the asset (?))
  constructor(readonly model: string) {}

  /**
   * Method to schedule the generation of the respective asset.
   * Does not perform validity checks, which need to be done with the respective methods
   *
   * @param timeService A TimeService that can be used to determine the temporal parameters of the simulation
   * @param timeStep The time step the generation is to be scheduled for
   * @param amount The quantity of generation scheduled for the respective time
   */
  public scheduleGeneration(timeService: TimeService, timeStep: number, amount: number): boolean {
    if (this.scheduledGeneration === undefined) {
      this.scheduledGeneration = new Array<number>(timeService.getEndTime());
    }
    if (timeService.getCurrentTime() >= timeStep) {
      return false;
    } else {
      this.scheduledGeneration[timeStep] = amount;
      return true;
    }
  }

}
