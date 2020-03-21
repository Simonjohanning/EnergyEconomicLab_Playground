import {DispatchableAsset} from './DispatchableAsset';
import {TimeService} from '../time.service';
import {min} from 'rxjs/operators';

/**
 * Representation of a storage unit as a storage asset within the simulation.
 * The StorageUnit is a DispatchableAsset, i.e. it can be scheduled for absorbing or dispensing electricity.
 *
 * @param model The model of the storage unit, as a descriptive string
 * @param storageCapacity The maximal amount of electricity stored in the storage unit (in kWh)
 * @param feedinPower The amount of power influx possible for the storage unit (in kW)
 * @param feedoutPower The amount of power outflux possible for the storage unit (in kW)
 * @param cycleEfficiency The efficiency of a load cycle. Aggregates charging and discharging losses, as well as discharging over a given amount of time. Basically the amount of work retained after charging and decharging the battery
 * @param initialSOC The percentage of charge already in the storage unit at the beginning of the simulation
 */
export class StorageUnit extends DispatchableAsset {
  /** history of the storage unit in amount of charge for each point in time within the simulation */
  private unitScheduleInitiated = false;

  constructor(
    readonly model: string,
    readonly storageCapacity: number,
    readonly feedinPower: number,
    readonly feedoutPower: number,
    readonly cycleEfficiency: number,
    readonly initialSOC: number
  ) {
    super(model);
  }


  // TODO include validation (?)
  /**
   * Method to charge or discharge the battery at a given time
   *
   * @param currentTime The time at which the battery charge is to be changed
   * @param chargeChange The change in battery charge level requested. If negative, this represents a discharge of the battery
   */
  public changeStorage(currentTime: number, chargeChange: number) {
    for (let i = currentTime; i < this.scheduledGeneration.length; i++) {
      this.scheduledGeneration[i] = (this.scheduledGeneration[i] + chargeChange);
    }
    console.log('Updating storage unit ' + this.model + ' to ' + this.scheduledGeneration[currentTime]);
  }

  public initiateSchedule(experimentLength: number) {
    this.scheduledGeneration = Array.from({length: experimentLength + 1}, () => this.initialSOC);
  }

  public scheduleGeneration(timeService: TimeService, timeStep: number, dispatchValue: number) {
    if (dispatchValue + Math.min(...this.scheduledGeneration.slice(timeStep)) < 0) {
      console.error('dispatch value results in negative storage values ' + (Math.min(...this.scheduledGeneration) + dispatchValue));
    } else
    if (dispatchValue + Math.max(...this.scheduledGeneration.slice(timeStep)) > this.storageCapacity) {
      console.error('dispatch value leads to overstepping the storage capacity of ' + this.storageCapacity);
    } else {
      for (let i = timeStep; i < this.scheduledGeneration.length; i++) {
        this.scheduledGeneration[i] = this.scheduledGeneration[i] + dispatchValue;
      }
    }
  }
}
