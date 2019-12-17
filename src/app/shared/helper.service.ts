import { Injectable } from '@angular/core';
import { StorageUnit } from '../core/data-types/StorageUnit';
import { Load } from '../core/data-types/Load';
import { TimeService } from '../core/time.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to provide the helper service to be used in other context for stateless functionality
 * not directly relevant for the functionality of the respective component/service
 */
export class HelperService {

  constructor() { }

  /**
   * Method to aggregate a number of arrays on an element-by-element base.
   * Additively aggregates the n-th element of each array in the n-th entry of the returned array.
   *
   * @param arrays Array with entries as the additive aggregate of the provided arrays
   */
  public static aggregateArrays(arrays: [][]): number[] {
    if (arrays[0] === []) {
      return [];
    }
    const aggregatedArrays = Array(arrays[0].length).fill(0);
    for (const index of Object.keys(arrays[0])) {
      arrays.forEach(currentArray => {
        aggregatedArrays[index] += currentArray[index];
      });
    }
    return aggregatedArrays;
  }

  // TODO revise to allow trading (or at least take into account traded electricity)
  /**
   * Method to calculate the maximal amount of electricity a Prosumer can take up with their own assets.
   * Is calculated as the cumulation of the maximal load of each load unit and the available storage / electricity inflow of all storage units
   *
   * @param loads The loads the prosumer can operate
   * @param storageUnits The storage units the prosumer can operate
   * @param timeService The time service used in the simulation
   * @return A number representing the maximal uptake
   */
  public static calculateMaxUptake(loads: Load[], storageUnits: StorageUnit[], timeService: TimeService): number {
    // extract max of the loads
    const maxLoads: number[] = loads.map(currentLoad => Math.max(...currentLoad.loadProfile));
    const reducer = (accumulator, initialValue) => accumulator + initialValue;
    const cumulatedLoads = maxLoads.reduce(reducer, 0);
    // extract charging capacity of every unit (at most the possible power flow in or the remaining charging capacity
    const initializedStorageUnits = HelperService.initializeUninitializedStorages(storageUnits, timeService);
    const storageCapacity: number[] = storageUnits.map(currentUnit => Math.min(currentUnit.feedinPower, (currentUnit.storageCapacity - currentUnit.scheduledGeneration[timeService.getCurrentTime()])));
    const cumulatedStorageCapacity = storageCapacity.reduce(reducer, 0);
    return cumulatedLoads + cumulatedStorageCapacity;
  }

  private static initializeUninitializedStorages(storageUnits: StorageUnit[], timeService: TimeService) {
    storageUnits.forEach(currentUnit => {
      currentUnit.initiateStorageSchedule(timeService);
    });
  }
}
