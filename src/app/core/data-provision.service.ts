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
import {ExperimentDescriptionService} from '../shared/experiment-description.service';
import {Observable, of} from 'rxjs';
import {TimeRegime} from './data-types/TimeRegime';
import {P2PMarketDesign} from './data-types/P2PMarketDesign';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to provide (stateless) data. For stateful data, the experiment state service is used.
 */
export class DataProvisionService {
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

  constructor(
    private eds: ExperimentDescriptionService
  ) { }

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

  getMockExperimentInstances(): Set<ExperimentInstance> {
    const collection: Set<ExperimentInstance> = new Set<ExperimentInstance>();
    const respectiveDescription: ExperimentDescription = this.getED();
    collection.add({experimentID: 0, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 1, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 2, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 3, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 4, instanceOfExperiment: respectiveDescription});
    collection.add({experimentID: 6, instanceOfExperiment: respectiveDescription});
    // console.log('about to return the collection ' + collection + ' with ' + collection.size + ' entries.');
    return collection;
  }

  getED(): ExperimentDescription {
    return this.eds.getExperimentDescription(0);
  }

  public getMockBids(): P2PBid[] { return this.mockBids; }

  getMockPublicActorData(): TransactionFeeEntry[] {
    const feeEntries = [];
    this.mockBids.forEach(currentBid => {
      const entry = {payer: currentBid.provider, amount: currentBid.price * 0.1, correspondingBid: currentBid};
      feeEntries.push(entry);
    });
    return feeEntries;
  }

}
