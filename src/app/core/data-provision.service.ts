import { Injectable } from '@angular/core';
import {Coordinates} from './data-types/Coordinates';
import {NonControllableGenerator} from './data-types/NonControllableGenerator';
import {ControllableGenerator} from './data-types/ControllableGenerator';
import {Load} from './data-types/Load';
import {StorageUnit} from './data-types/StorageUnit';
import {TransactionFeeEntry} from './data-types/TransactionFeeEntry';
import {P2PBid} from './data-types/P2PBid';

@Injectable({
  providedIn: 'root'
})
export class DataProvisionService {

  public storage: any;
  public experimentId: number;
  private mockBids: P2PBid[] = [
    {
      id: 1,
      provider: {id: 1},
      deliveryTime: 81,
      duration: 3,
      price: 2,
      power: 1.5
    },
    {
      id: 2,
      provider: {id: 1},
      deliveryTime: 12,
      duration: 2,
      price: 1.6,
      power: 1.5
    },
    {
      id: 3,
      provider: {id: 1},
      deliveryTime: 33,
      duration: 1,
      price: 2.2,
      power: 1.5
    },
    {
      id: 4,
      provider: {id: 1},
      deliveryTime: 13,
      duration: 2,
      price: 2.1,
      power: 1.5
    }
  ];

  constructor() { }

  public getMockBids(): P2PBid[] { return this.mockBids; }

  getCoordinates(): Coordinates {
    const x = 2.3;
    const y = 1.4;
    return {x, y};
  }

  getNonControllableGenerators(): NonControllableGenerator[] {
    return [this.getNCGenerator()];
  }

  getControllableGenerators(): ControllableGenerator[] {
    return [this.getCGenerator()];
  }
  getLoads(): Load[] {
    return [this.getLoad1(), this.getLoad2()];
  }

  getStorages(): StorageUnit[] {
    return [this.getStorage()];
  }

  getNCGenerator(): NonControllableGenerator {
    return {
      model: 'SolarPanel #3',
      peakPower: 4.1,
      projectedGeneration: [1.2, 2.3, 2.1]
    };
  }
  getCGenerator(): ControllableGenerator {
    const model = 'controllable Generator #2';
    const maximalGeneration = 2.0;
    const minimalDowntime = 0.3;
    const minimalUptime = 0.4;
    const rampingParameter = 0.2;
    const heatCouplingNumber = 1.3;
    return new ControllableGenerator(
      model,
      maximalGeneration,
      minimalDowntime,
      minimalUptime,
      rampingParameter,
      heatCouplingNumber
    );
  }
  getLoad1(): Load {
    const model = 'Load1';
    const loadProfile =  [1.2, 1.3, 0.4];
    const relativeControllability = 0.2;
    const temporalShiftingCapability = 0.7;
    return new Load(model, loadProfile, relativeControllability, temporalShiftingCapability);
  }
  getLoad2(): Load {
    const model = 'Load2';
    const loadProfile = [1.3, 1.1, 0.7];
    const relativeControllability = 0.2;
    const temporalShiftingCapability = 0.7;
    return new Load(model, loadProfile, relativeControllability, temporalShiftingCapability);
  }
  getStorage(): StorageUnit {
    const model = 'CoolStore';
    const storageCapacity = 2.1;
    const feedinPower = 0.3;
    const feedoutPower = 0.3;
    const cycleEfficiency = 0.9;
    const currentSOC = 0.2;
    return new StorageUnit(model, storageCapacity, feedinPower, feedoutPower, cycleEfficiency, currentSOC);
  }

  getMockPublicActorData(): TransactionFeeEntry[] {
    const feeEntries = [];
    this.mockBids.forEach(currentBid => {
      const entry = {payer: currentBid.provider, amount: currentBid.price * 0.1, correspondingBid: currentBid};
      feeEntries.push(entry);
    });
    return feeEntries;
  }
}
