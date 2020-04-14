import { Injectable } from '@angular/core';
import { StorageUnit } from '../core/data-types/StorageUnit';

@Injectable({
  providedIn: 'root'
})

export class StorageOperationLogicService {
  /** returns the maximum possible value for charging storage unit at a time step
   * *
   * @param asset Storage unit under consideration
   * @param timeStep Time step of (dis-)charge
   */
  static deriveMaxChargeStorage(asset: StorageUnit, timeStep: number) {
    return Math.min(asset.storageCapacity - Math.max(...asset.scheduledGeneration.slice(timeStep)), asset.feedinPower);
  }

  /** returns minimum value of remaining scheduled storage that can be discharged at a time step
   *
   * @param asset Storage unit under consideration
   * @param timeStep Time step of (dis-)charge
   */
  static deriveMaxDischargeStorage(asset: StorageUnit, timeStep: number) {
    return -Math.min(...asset.scheduledGeneration.slice(timeStep), asset.feedoutPower);
  }

  /**
   * Actual scheduling of an asset given a certain time and a (dis)charge value with respect to the current time
   *
   * @param asset Storage Unit that is (dis)charged
   * @param timeStep Time of (dis)charge
   * @param dispatchValue Amount of (dis)charge energy
   * @param currentTime The progressed time of the experiment
   */
  static schedule(asset: StorageUnit, timeStep: number, dispatchValue: number, currentTime: number) {
    if (timeStep <= currentTime) {
      // TODO throw error and catch it in respective functions
      console.log('tried to (dis)charge ' + asset.model + ' at time ' + timeStep + ' while time has already progressed to ' + currentTime);
      return;
    }
    if (dispatchValue + Math.min(...asset.scheduledGeneration.slice(timeStep)) < 0) {
      console.error('dispatch value results in negative storage values ' + (Math.min(...asset.scheduledGeneration) + dispatchValue));
    } else
    if (dispatchValue + Math.max(...asset.scheduledGeneration.slice(timeStep)) > asset.storageCapacity) {
      console.error('dispatch value leads to overstepping the storage capacity of ' + asset.storageCapacity);
    } else {
      for (let i = timeStep; i < asset.scheduledGeneration.length; i++) {
        asset.scheduledGeneration[i] = asset.scheduledGeneration[i] + dispatchValue;
      }
    }
  }
}
