import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Prosumer} from './data-types/Prosumer';
import {NonControllableGenerator} from './data-types/NonControllableGenerator';
import {ProsumerInstance} from './data-types/ProsumerInstance';
import {ControllableGenerator} from './data-types/ControllableGenerator';
import {Load} from './data-types/Load';
import {StorageUnit} from './data-types/StorageUnit';
import {Coordinates} from './data-types/Coordinates';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class ExperimentInstanceLoaderService {
/* For building objects out of http request:
this.http.get('...')
    .map(res => {
      var data = res.json();
      return data.map(d => {
        return new Object(d.prop1,
          d.prop2, ...);
      });
    });

 */
  constructor(
    private http: HttpClient) {
  }

   getStaticProsumers(): Prosumer[] {
    let prosumerArray: Prosumer[];
    prosumerArray = [
      { id: 1, name: 'Mr. Nice' },
      { id: 2, name: 'Hans'}
    ];
    return prosumerArray;
  }

  staticgetExperimentTime(): Observable<number> {
    return of(0);
  }

  urlBuilder(selector: string): string {
    return ('api/' + selector);
  }

  getProsumers(): Observable<Prosumer[]> {
    return this.http.get<Prosumer[]>(this.urlBuilder('prosumers'));
  }
  getProsumer(id: number): Observable<Prosumer> {
    const url = `${this.urlBuilder('prosumers')}/${id}`;
    console.log(['Trying to get Prosumer ', url]);
    return this.http.get<Prosumer>(url);
  }

  getProsumerData(): Observable<ProsumerInstance> {
    let prosumerInstance: ProsumerInstance;
    prosumerInstance = new ProsumerInstance(this.getControllableGenerators(), this.getNonControllableGenerators(), this.getLoads(), this.getStorages(), this.getCoordinates(), 100);
    return of(prosumerInstance);
  }



 /* getStaticProsumerData(): ProsumerInstance {
    /!*let respectiveProsumer: Prosumer;*!/
    let feedInCoordinates: Coordinates;
    /!*this.getProsumer(id).subscribe(prosumer => respectiveProsumer = prosumer);*!/
    const controllableGenerators = this.getControllableGenerators();
    const nonControllableGenerators = this.getNonControllableGenerators();
    const loads = this.getLoads();
    const storage = this.getStorages();
    feedInCoordinates = this.getCoordinates();
    const numTokens = 100;
    this.prosumerInstance = {controllableGenerators, nonControllableGenerators, loads, storage, feedInCoordinates, numTokens};
    return this.prosumerInstance;
  }*/

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
}
