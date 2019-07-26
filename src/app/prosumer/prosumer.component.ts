import { Component, OnInit } from '@angular/core';
import {Prosumer} from '../core/data-types/Prosumer';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import {ExperimentInstanceLoaderService} from '../core/experiment-instance-loader.service';
import {DataProvisionService} from '../core/data-provision.service';
import {TimeService} from '../core/time.service';
import {ProsumerInstance} from '../core/data-types/ProsumerInstance';
import {Observable} from 'rxjs';

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

  constructor( private route: ActivatedRoute,
               private loader: ExperimentInstanceLoaderService,
               private location: Location,
               private data: DataProvisionService,
               private timeService: TimeService)
  {
    this.prosumerInstance = this.loader.getProsumerData();
  }

  ngOnInit() {
    this.getProsumer();
    this.experimentId = this.data.experimentId;
    /*this.getProsumerData();*/
  }

  getProsumer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loader.getProsumer(id)
      .subscribe(prosumer => this.prosumer = prosumer);
  }

}
