import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to provide the helper service to be used in other context for stateless functionality not directly relevant for the functionality of the respective component/service
 */
export class HelperService {

  constructor() { }

  /**
   * Method to aggregate a number of arrays on an element-by-element base.
   * Additively aggregates the n-th element of each array in the n-th entry of the returned array.
   *
   * @param arrays Array with entries as the additive aggregate of the provided arrays
   */
  aggregateArrays(arrays: [][]) {
    const aggregatedArrays = Array(arrays[0].length).fill(0);
    const indexRange = Array.from(Array(arrays[0].length).keys());
    for (const index of indexRange) {
      arrays.forEach(currentArray => {
        aggregatedArrays[index] += currentArray[index];
      });
    }
    return aggregatedArrays;
  }
}
