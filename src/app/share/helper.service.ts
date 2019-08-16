import { Injectable } from '@angular/core';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  public roundNumber(preciseNumber, precision: number) {
    return Number.parseFloat(preciseNumber).toPrecision(precision);
  }

  aggregateArrays(arrays: [][]) {
/*    console.log('Attempting to aggregate following arrays: ')
    arrays.forEach(currentArray => console.log(currentArray));*/
    const aggregatedArrays = Array(arrays[0].length).fill(0);
    const indexRange = Array.from(Array(arrays[0].length).keys());
    for (const index of indexRange) {
      arrays.forEach(currentArray => {
        aggregatedArrays[index] += currentArray[index];
      });
    }
    /*console.log('aggregated arrays are '+aggregatedArrays);*/
    return aggregatedArrays;
  }
}
