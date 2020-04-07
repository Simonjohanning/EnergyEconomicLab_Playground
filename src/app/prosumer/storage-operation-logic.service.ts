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
}
