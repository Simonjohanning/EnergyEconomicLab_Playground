import { Injectable } from '@angular/core';
import {Coordinates} from './data-types/Coordinates';
import {NonControllableGenerator} from './data-types/NonControllableGenerator';
import {ControllableGenerator} from './data-types/ControllableGenerator';
import {Load} from './data-types/Load';
import {StorageUnit} from './data-types/StorageUnit';
import {TransactionFeeEntry} from './data-types/TransactionFeeEntry';
import {P2PBid} from './data-types/P2PBid';
import {ExperimentInstance} from './data-types/ExperimentInstance';
import {ExperimentDescription} from './data-types/ExperimentDescription';
import {Observable, of} from 'rxjs';
import {TimeRegime} from './data-types/TimeRegime';
import {P2PMarketDesign} from './data-types/P2PMarketDesign';
import {Prosumer} from './data-types/Prosumer';
import {ProsumerInstance} from './data-types/ProsumerInstance';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to provide (stateless) data.
 * This service is predominantly used for providing mock data that will eventually be provided by the EDM service, and will be discarded at the latest in production.
 * Methods are all getter methods that provide mock data, so none will be documented further.
 * Stateful data (on the experiment) is provided by the experiment state service.
 */
export class DataProvisionService {
  maxBidSize = 10000;
  private mockBids: P2PBid[] = [
    {
      id: 1,
      provider: this.getMockProsumerInstance(),
      deliveryTime: 81,
      duration: 3,
      price: 2,
      power: 1.5
    },
    {
      id: 2,
      provider: this.getMockProsumerInstance(),
      deliveryTime: 12,
      duration: 2,
      price: 1.6,
      power: 1.5
    },
    {
      id: 3,
      provider: this.getMockProsumerInstance(),
      deliveryTime: 33,
      duration: 1,
      price: 2.2,
      power: 1.5
    },
    {
      id: 4,
      provider: this.getMockProsumerInstance(),
      deliveryTime: 13,
      duration: 2,
      price: 2.1,
      power: 1.5
    }
  ];

  constructor() { }

  static getExperimentLength(): Observable<number> {
    return of(120);
  }

  static getTimeRegime(): Observable<TimeRegime> {
    const regime = TimeRegime.DISCRETE;
    return of(regime);
  }

  static getTimeStepLength(): Observable<number> {
    const stepLength = 300;
    console.log('returning observable of stepLength');
    return of(stepLength);
  }

  static getCO2Price(): Observable<number[]> {
    const price = [0.2, 0.2, 0.4];
    return of(price);
  }

  static getGasPrice(): Observable<number[]> {
    const price = [0.2, 0.2, 0.4];
    return of(price);
  }

  static getPrognosisVisibilityScheme(): Observable<string> {
    return of('default');
  }

  static getScheduleVisibilityScheme(): Observable<string> {
    return of('default');
  }

  static getBidVisibilityScheme(): Observable<string> {
    return of('default');
  }

  static getRole(id: string): Observable<string> {
    if (parseInt(id, 10) < 10) { return of ('role1');
    } else {
      return of('role2'); }
  }

  static getP2PMarketDescription(experimentId: number): Observable<P2PMarketDesign> {
    return of({
      bidClosure: 5,
      timeSliceLength: 2,
      minBidSize: 0.5,
      maxPrice: -1,
      feeAmount: .1
    });
  }

  static getAccellerationFactor(): Observable<number> {
    const accellerationFactor = 10;
    return of(accellerationFactor);
  }

  static getCoordinates(): Coordinates {
    const x = 2.3;
    const y = 1.4;
    return {x, y};
  }

  static getNonControllableGenerators(): NonControllableGenerator[] {
    return [this.getNCGenerator()];
  }

  static getControllableGenerators(): ControllableGenerator[] {
    return [this.getCGenerator()];
  }
  static getLoads(): Load[] {
    return [this.getLoad1(), this.getLoad2()];
  }

  static getStorages(): StorageUnit[] {
    return [this.getStorage()];
  }

  static getNCGenerator(): NonControllableGenerator {
    return {
      model: 'SolarPanel #3',
      peakPower: 4.1,
      projectedGeneration: [1.2, 2.3, 2.1]
    };
  }

  static getCGenerator(): ControllableGenerator {
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

  static getLoad1(): Load {
    const model = 'Load1';
    const loadProfile =  [1.2, 1.3, 0.4];
    const relativeControllability = 0.2;
    const temporalShiftingCapability = 0.7;
    return new Load(model, loadProfile, relativeControllability, temporalShiftingCapability);
  }

  static getLoad2(): Load {
    const model = 'Load2';
    const loadProfile = [1.3, 1.1, 0.7];
    const relativeControllability = 0.2;
    const temporalShiftingCapability = 0.7;
    return new Load(model, loadProfile, relativeControllability, temporalShiftingCapability);
  }

  static getStorage(): StorageUnit {
    const model = 'CoolStore';
    const storageCapacity = 2.1;
    const feedinPower = 0.3;
    const feedoutPower = 0.3;
    const cycleEfficiency = 0.9;
    const initialSOC = 0.2;
    return new StorageUnit(model, storageCapacity, feedinPower, feedoutPower, cycleEfficiency, initialSOC);
  }

  static getStaticProsumers(): Prosumer[] {
    let prosumerArray: Prosumer[];
    prosumerArray = [
      { id: 1, name: 'Mr. Nice' },
      { id: 2, name: 'Hans'}
    ];
    return prosumerArray;
  }

  static getProsumerData(id = 1): Observable<ProsumerInstance> {
    let prosumerInstance: ProsumerInstance;
    prosumerInstance = new ProsumerInstance(
      new Prosumer(id, 'mock prosumer'),
      DataProvisionService.getControllableGenerators(),
      DataProvisionService.getNonControllableGenerators(),
      DataProvisionService.getLoads(),
      DataProvisionService.getStorages(),
      DataProvisionService.getCoordinates(),
      100);
    return of(prosumerInstance);
  }

  static getExperimentDescription(experimentType: number): ExperimentDescription {
    if (experimentType === 0) {
      return {
        prosumers: new Array(),
        p2pMarketDesign: {
          bidClosure: 10,
          timeSliceLength: 1,
          minBidSize: 1,
          maxPrice: 10000,
          feeAmount: .1
        },
        description: 'mock experiment description for type 0'
      };
    }
  }

  getMockProsumerInstance(id = 1): ProsumerInstance {
    return new ProsumerInstance(
      new Prosumer(id, 'mock prosumer'),
      DataProvisionService.getControllableGenerators(),
      DataProvisionService.getNonControllableGenerators(),
      DataProvisionService.getLoads(),
      DataProvisionService.getStorages(),
      DataProvisionService.getCoordinates(),
      100);
  }

  getMaxBidSize() {
    return of(this.maxBidSize);
  }

  getMockExperimentInstances(): Set<ExperimentInstance> {
    const collection: Set<ExperimentInstance> = new Set<ExperimentInstance>();
    const respectiveDescription: ExperimentDescription = DataProvisionService.getExperimentDescription(0);
    collection.add({experimentID: 0, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 1, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 2, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 3, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 4, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 6, instanceOfExperiment: respectiveDescription});
    // console.log('about to return the collection ' + collection + ' with ' + collection.size + ' entries.');
    return collection;
  }

  public getMockBids(): P2PBid[] { return this.mockBids; }

  getMockPublicActorData(): Set<TransactionFeeEntry> {
    const feeEntries = new Set<TransactionFeeEntry>();
    this.mockBids.forEach(currentBid => {
      const entry = {payer: currentBid.provider, amount: currentBid.price * 0.1, correspondingBid: currentBid};
      feeEntries.add(entry);
    });
    return feeEntries;
  }
}
