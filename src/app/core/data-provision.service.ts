import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {TimeRegime} from './data-types/TimeRegime';
import {Coordinates} from './data-types/Coordinates';

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
}
