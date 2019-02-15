import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Prosumer} from './data-types/Prosumer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class ExperimentInstanceLoaderService{

  prosumers: Prosumer[];

  constructor(
    private http: HttpClient) {
  }

  urlBuilder(selector: string): string {
    return ('api/' + selector);
  }

  getProsumers(): Observable<Prosumer[]> {
    return this.http.get<Prosumer[]>(this.urlBuilder('prosumers'));
  }

  getProsumer(id: number): Observable<Prosumer>{
    const url = `${this.urlBuilder('prosumers')}/${id}`;
    return this.http.get<Prosumer>(url);
  }
}
