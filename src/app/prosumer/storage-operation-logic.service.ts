import { Injectable } from '@angular/core';
import { StorageUnit } from '../core/data-types/StorageUnit';

@Injectable({
  providedIn: 'root'
})

export class StorageOperationLogicService {
  /** returns the maximum possible value for charging storage unit from a time step on */
  static deriveMaxChargeStorage(asset: StorageUnit, timeStep: number) {
    return asset.storageCapacity - Math.max(...asset.scheduledGeneration.slice(timeStep));
  }

  /** returns minimum value of remaining scheduled storage that can be discharged from a time step on */
  static deriveMaxDischargeStorage(asset: StorageUnit, timeStep: number) {
    return -Math.min(...asset.scheduledGeneration.slice(timeStep));
  }
}
