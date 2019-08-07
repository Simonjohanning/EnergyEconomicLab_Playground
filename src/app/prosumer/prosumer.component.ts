import { Component, OnInit } from '@angular/core';
import {Prosumer} from '../core/data-types/Prosumer';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import {ExperimentInstanceLoaderService} from '../core/experiment-instance-loader.service';
import {TimeService} from '../core/time.service';
import {ProsumerInstance} from '../core/data-types/ProsumerInstance';
import {Observable} from 'rxjs';
import {ExperimentStateService} from '../core/experiment-state.service';
import {DataProvisionService} from '../core/data-provision.service';

@Component({
  selector: 'app-prosumer',
  templateUrl: './prosumer.component.html',
  styleUrls: ['./prosumer.component.css']
})
export class ProsumerComponent implements OnInit {

  private prosumer: Prosumer;
  private experimentId: number;
  private showPRD = false;
  private showAssetDispatch = false;
  private prosumerInstance: Observable<ProsumerInstance>;
  private currentView = 'MarketView';

  constructor( private route: ActivatedRoute,
               private loader: ExperimentInstanceLoaderService,
               private location: Location,
               private ess: ExperimentStateService,
               private timeService: TimeService) {
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

  private changeView(newView: string): void {
    this.currentView = newView;
  }

}
