import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TimeRegime } from './data-types/TimeRegime';
import { Coordinates } from './data-types/Coordinates';
import { Prosumer } from './data-types/Prosumer';
import { ProsumerInstance } from './data-types/ProsumerInstance';
import { ControllableGenerator} from './data-types/ControllableGenerator';
import { NonControllableGenerator} from './data-types/NonControllableGenerator';
import { Load} from './data-types/Load';
import { StorageUnit } from './data-types/StorageUnit';

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


  static getAccellerationFactor(): Observable<number> {
    const accellerationFactor = 10;
    return of(accellerationFactor);
  }

  static getCoordinates(): Coordinates {
    const x = 2.3;
    const y = 1.4;
    return {x, y};
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

  static getControllableGenerators(): ControllableGenerator[] {
    return [this.getCGenerator()];
  }

  static getNonControllableGenerators(): NonControllableGenerator[] {
    return [this.getNCGenerator()];
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
}
