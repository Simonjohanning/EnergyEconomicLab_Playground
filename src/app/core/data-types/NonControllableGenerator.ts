/**
 * An asset that represents every generator of electricity where electricity generation cannot easily be changed by the asset operator,
 * but is (pre-)determined by other factors (e.g. weather).
 * Thus, this asset is not dispatchable and thus not hierarchically situated.
 *
 * @params model: A string describing the model name of the asset
 * @params peakPower The maximal power the asset can generate under optimal conditions
 */


export class NonControllableGenerator {

  public projectedGeneration: number[];

  constructor(
    readonly model: string,
    readonly peakPower: number
  ) {}

  public initiateProjectedGeneration(experimentLength: number) {
    // this.projectedGeneration = Array.from({length: experimentLength + 1}, () => 0);
    // for (let i = 0; i < 10; i++) {
    //  console.log(this.throwCoin());
    // }
    // TODO read in more reasonable data
    this.projectedGeneration = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.6, 9.9,
      8.6, 8.0, 8.1, 3.9, 5.8, 6.8, 0.4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 6.1, 9.2, 5.5, 8.1, 7.3, 8.2, 7.7, 6.6, 2.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.1, 9.6, 5.9, 6.1, 7.5, 4.9, 8.5, 7.1, 3.4, 0.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.2, 7.6, 9.0, 8.6, 8.4, 9.0, 9.5, 7.5, 3.7, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }


  // in case of random Gaussian-like behavior, go for coin flipping --> binary number, that is interpreted as
  // decimal, build vector and get probability for each entry i that is also a number from coin tossing event
  // repeat 10k times or so
  // private throwCoin(): number {
  //   return Math.round(Math.random());
  // }

}
