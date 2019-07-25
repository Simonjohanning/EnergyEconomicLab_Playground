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
import {BlockchainTransactionService} from './blockchain-transaction.service';
import {TransactionFeeEntry} from './data-types/TransactionFeeEntry';
import {DataProvisionService} from './data-provision.service';

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
    private http: HttpClient,
    private bts: BlockchainTransactionService,
    private data: DataProvisionService) {
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
    prosumerInstance = new ProsumerInstance(this.data.getControllableGenerators(), this.data.getNonControllableGenerators(), this.data.getLoads(), this.data.getStorages(), this.data.getCoordinates(), 100);
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


}
