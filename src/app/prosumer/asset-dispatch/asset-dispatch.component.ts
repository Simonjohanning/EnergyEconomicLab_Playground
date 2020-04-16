import { Component, Input, OnInit } from '@angular/core';
import { ProsumerInstance } from '../../core/data-types/ProsumerInstance';
import { DispatchableAsset } from '../../core/data-types/DispatchableAsset';
import { TimeService } from '../../core/time.service';
import { Observable } from 'rxjs';
import { AssetSchedulingDataPoint } from '../../core/data-types/AssetSchedulingDataPoint';

@Component({
  selector: 'app-asset-dispatch',
  templateUrl: './asset-dispatch.component.html',
  styleUrls: ['./asset-dispatch.component.css']
})

/**
 * This component is the top component for the dispatch of the individual assets a Prosumer manages.
 * It hosts the dispatch component of the individual assets as child components and manages the scheduling for future dispatch (as dispachable assets) for all assets the respective prosumer instance comprises.
 */
export class AssetDispatchComponent implements OnInit {
  /** The prosumer instance whose assets are managed by the component */
  @Input() prosumerInstance: Observable<ProsumerInstance>;
  /** selector string to display the respective asset component */
  private selectedAsset: string;
  /** Map to hold the assets the prosumer manages as dispachable (i.e. scheduable) assets */
  public scheduledAssets: Map<string, DispatchableAsset> = new Map<string, DispatchableAsset>();
  /** Informative string to display the dispatch schedule for an asset */
  private scheduledDispatch = '';

  constructor(private timeService: TimeService) {
  }

  ngOnInit() {
    // derive the assets of the respective instance and set up the dispach map
    this.prosumerInstance.subscribe(emittedProsumerInstance => {
      emittedProsumerInstance.controllableGenerators.forEach(currentAsset => {
        this.scheduledAssets.set(currentAsset.model, currentAsset);
      });
      emittedProsumerInstance.storage.forEach(currentAsset => {
        this.scheduledAssets.set(currentAsset.model, currentAsset);
      });
      emittedProsumerInstance.loads.forEach(currentAsset => {
        this.scheduledAssets.set(currentAsset.model, currentAsset);
      });
    });
  }

  /**
   * Method to update the scheduling of a dispatchable asset based on the scheduling data through the scheduleGeneration of the respective dispatchable asset
   *
   * @param schedulingData An AssetSchedulingDataPoint that comprises the asset to schedule, the time step to schedule the asset for and the value to schedule dispatch for
   */
  updateAssetScheduling(schedulingData: AssetSchedulingDataPoint) {
    this.scheduledAssets.get(schedulingData.asset.model).scheduleGeneration(schedulingData.scheduledTimeStep, schedulingData.plannedDispatchValue, this.timeService.getCurrentTime());
  }

  /**
   * Helper method to display the schedule of the dispatchable asset through the display string of this component (scheduledDispatch)
   *
   * @param asset The (dispatchable) asset to display the schedule for
   */
  printSchedule(asset: DispatchableAsset) {
    if (asset.scheduledGeneration === undefined) {
      this.scheduledDispatch = 'Please provide data';
    } else {
      this.scheduledDispatch = 'Dispatch data for ' + asset.model + ': [';
      asset.scheduledGeneration.forEach(currentEntry => {
        this.scheduledDispatch += (currentEntry + ', ');
      });
      // remove last two characters (', ')
      this.scheduledDispatch = this.scheduledDispatch.slice(0, -2);
      this.scheduledDispatch += ']';
    }
  }
}
