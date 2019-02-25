import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockEDMService {

  constructor() { }
  getExperimentLength(): Observable<number> {
    return of(3);
  }
  getTimeRegime(): Observable<TimeRegime> {
    const regime = TimeRegime.DISCRETE;
    return of(regime);
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
}
