import {Component, Input, OnInit} from '@angular/core';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {DispatchableAsset} from '../../core/data-types/DispatchableAsset';
import {TimeService} from '../../core/time.service';
import {Observable} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import {ExperimentInstanceLoaderService} from '../../core/experiment-instance-loader.service';
import {MockEDMService} from '../../core/mock-edm.service';

@Component({
  selector: 'app-asset-dispatch',
  templateUrl: './asset-dispatch.component.html',
  styleUrls: ['./asset-dispatch.component.css']
})
export class AssetDispatchComponent implements OnInit {

  @Input() prosumerInstance: Observable<ProsumerInstance>;
  @Input() timeService: TimeService;
  private selectedAsset: string;
  public scheduledGeneration: Map<string, DispatchableAsset> = new Map<string, DispatchableAsset>();
  private scheduledDispatch = '';

  constructor() {
  }

  ngOnInit() {
    this.prosumerInstance.subscribe(emittedProsumerInstance => {
      emittedProsumerInstance.controllableGenerators.forEach(currentAsset => {
        this.scheduledGeneration.set(currentAsset.model, currentAsset);
      });
      emittedProsumerInstance.storage.forEach(currentAsset => {
        this.scheduledGeneration.set(currentAsset.model, currentAsset);
      });
      emittedProsumerInstance.loads.forEach(currentAsset => {
        this.scheduledGeneration.set(currentAsset.model, currentAsset);
      });
    });
  }

  updateAssetGenerationScheduling(schedulingData) {
    this.scheduledGeneration.get(schedulingData.asset.model).scheduleGeneration(this.timeService, schedulingData.scheduledTimeStep, schedulingData.plannedGenerationValue);
  }

  printSchedule(asset: DispatchableAsset) {
    this.scheduledDispatch = 'Dispatch data for ' + asset.model + ': [';
    asset.scheduledGeneration.forEach(currentEntry => { this.scheduledDispatch += (currentEntry + ', '); });
    this.scheduledDispatch += ']';
  }
}
