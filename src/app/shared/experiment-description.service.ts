import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ExperimentDescription} from '../core/data-types/ExperimentDescription';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ExperimentDescriptionService {

  constructor(private httpClient: HttpClient) { }

  getExperimentDescription(experimentType: number): ExperimentDescription {
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
}
