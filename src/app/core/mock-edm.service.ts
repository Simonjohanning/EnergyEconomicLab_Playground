import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {P2PMarketDesign} from './data-types/P2PMarketDesign';
import { TimeRegime } from './data-types/TimeRegime';
import {ExperimentDescription} from './data-types/ExperimentDescription';

@Injectable({
  providedIn: 'root'
})
export class MockEDMService {

  constructor() { }
  getExperimentLength(): Observable<number> {
    return of(120);
  }
  getTimeRegime(): Observable<TimeRegime> {
    const regime = TimeRegime.DISCRETE;
    return of(regime);
  }
  getTimeStepLength(): Observable<number> {
    const stepLength = 300;
    console.log('returning observable of stepLength');
    return of(stepLength);
  }
  getCO2Price(): Observable<number[]> {
    const price = [0.2, 0.2, 0.4];
    return of(price);
  }
  getGasPrice(): Observable<number[]> {
    const price = [0.2, 0.2, 0.4];
    return of(price);
  }
  getPrognosisVisibilityScheme(): Observable<string> {
    return of('default');
  }
  getScheduleVisibilityScheme(): Observable<string> {
    return of('default');
  }
  getBidVisibilityScheme(): Observable<string> {
    return of('default');
  }
  getRole(id: string): Observable<string> {
    if (parseInt(id, 10) < 10) { return of ('role1');
    } else {
      return of('role2'); }
  }
  getP2PMarketDescription(experimentId: number): Observable<P2PMarketDesign> {
    return of({
      bidClosure: 5,
      timeSliceLength: 2,
      minBidSize: 0.5,
      maxPrice: -1,
      feeAmount: .1
    });
  }

  getAccellerationFactor(): Observable<number> {
    const accellerationFactor = 10;
    return of(accellerationFactor);
  }

  // TODO do something meaningful
  addExperimentDescription(descriptionToStore: ExperimentDescription): void{
    console.log('Attempting to store ' + descriptionToStore);
  }
}
