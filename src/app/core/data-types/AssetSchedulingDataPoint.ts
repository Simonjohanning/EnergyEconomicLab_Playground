import {DispatchableAsset} from './DispatchableAsset';

/**
 * Interface to describe a data point for the scheduling of a dispatchable asset.
 */
export interface AssetSchedulingDataPoint {
  /** Asset whose dispatch is to be scheduled */
  asset: DispatchableAsset;
  /** The time step for which the dispatch is to be scheduled */
  scheduledTimeStep: number;
  /** The operational value to which the asset is to be dispatched */
  plannedDispatchValue: number;
}

