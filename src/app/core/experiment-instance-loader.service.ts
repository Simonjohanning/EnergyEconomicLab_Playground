import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Prosumer } from './data-types/Prosumer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})

/**
 * Service to load the instance of the experiment from the respective storage.
 * Currently limited to prosumer data from path
 */
export class ExperimentInstanceLoaderService {

  constructor(
    private http: HttpClient
  ) {  }

  /**
   * Method to retrieve a specific prosumer based on its id
   *
   * @param id The id of the prosumer to retrieve
   */
  getProsumer(id: number): Observable<Prosumer> {
    const prosumerAPI = 'api/prosumers';
    const url = `${prosumerAPI}/${id}`;
    console.log(['Trying to get Prosumer ', url]);
    return this.http.get<Prosumer>(url);
  }
}
