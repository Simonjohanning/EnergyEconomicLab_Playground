/**
 * An asset that represents every generator of electricity where electricity generation cannot easily be changed by the asset operator,
 * but is (pre-)determined by other factors (e.g. weather).
 * Thus, this asset is not dispatchable and thus not hierarchically situated.
 *
 * @params model: A string describing the model name of the asset
 * @params peakPower The maximal power the asset can generate under optimal conditions
 * @params projectedGeneration the expected generation of the asset at each given time step within the time regime
 */
export class NonControllableGenerator {
  constructor(
    readonly model: string,
    readonly peakPower: number,
    readonly projectedGeneration: number[]
  ) {}
}
