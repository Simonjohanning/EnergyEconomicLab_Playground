import { Component, OnInit } from '@angular/core';
import { Prosumer } from '../core/data-types/Prosumer';
import { ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { ExperimentInstanceLoaderService } from '../core/experiment-instance-loader.service';
import { ProsumerInstance } from '../core/data-types/ProsumerInstance';
import { Observable } from 'rxjs';
import { ExperimentStateService } from '../core/experiment-state.service';
import { DataProvisionService } from '../core/data-provision.service';

@Component({
  selector: 'app-prosumer',
  templateUrl: './prosumer.component.html',
  styleUrls: ['./prosumer.component.css']
})

/**
 * (Top-level) component to host all relevant information for a prosumer
 */
export class ProsumerComponent implements OnInit {
  /** The prosumer to be displayed */
  private prosumer: Prosumer;
  /** The id of the experiment the prosumer is participanting in */
  private experimentId: number;
  /** selection variable that indicates whether the persistant resource display should be shown or not */
  private showPRD = false;
  /** selection variable that indicates whether the asset dispatch component should be shown or not */
  private showAssetDispatch = false;
  /** An observable of the prosumer instance connected to the prosumer */
  private prosumerInstance: Observable<ProsumerInstance>;
  /** selection variable that indicates which other view to include in the component view */
  private currentView = 'MarketView';

  constructor( private route: ActivatedRoute,
               private loader: ExperimentInstanceLoaderService,
               private location: Location,
               private ess: ExperimentStateService) {
    this.prosumerInstance = DataProvisionService.getProsumerData();
  }

  ngOnInit() {
    this.getProsumer();
    this.experimentId = this.ess.experimentID;
    /*this.getProsumerData();*/
  }

  getProsumer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loader.getProsumer(id)
      .subscribe(prosumer => this.prosumer = prosumer);
  }

  /**
   * Selection method to change the component that should be shown
   *
   * @param newView string of component to be shown (BidEditor, MarketView, FeeView)
   */
  private changeView(newView: string): void {
    this.currentView = newView;
  }

}
