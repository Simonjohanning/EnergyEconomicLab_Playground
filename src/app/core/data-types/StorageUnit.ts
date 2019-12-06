import {DispatchableAsset} from './DispatchableAsset';

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
  public storageHistory: Array<number>;

  constructor(
    readonly model: string,
    readonly storageCapacity: number,
    readonly feedinPower: number,
    readonly feedoutPower: number,
    readonly cycleEfficiency: number,
    readonly initialSOC: number
  ) {
    super(model);
    this.storageHistory = new Array<number>();
    console.log('initializing storage ' + model + ' with history ' + this.storageHistory);
    this.storageHistory[0] = initialSOC;
    console.log('storage history of ' + model + ' is ' + this.storageHistory + ' with its first entry of ' + this.storageHistory[0] + ' and second entry ' + this.storageHistory[1]);
  }


  // TODO include validation (?)
  /**
   * Method to charge or discharge the battery at a given time
   *
   * @param currentTime The time at which the battery charge is to be changed
   * @param chargeChange The change in battery charge level requested. If negative, this represents a discharge of the battery
   */
  public changeStorage(currentTime: number, chargeChange: number) {
    this.storageHistory[currentTime] = (this.storageHistory[currentTime - 1] + chargeChange);
    console.log('Updating storage unit ' + this.model + ' to ' + this.storageHistory[currentTime]);
  }
}
