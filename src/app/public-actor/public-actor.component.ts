import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {DataProvisionService} from '../core/data-provision.service';
import {ExperimentInstanceLoaderService} from '../core/experiment-instance-loader.service';
import {TransactionFeeEntry} from '../core/data-types/TransactionFeeEntry';
import {ExperimentStateService} from '../core/experiment-state.service';

@Component({
  selector: 'app-public-actor',
  templateUrl: './public-actor.component.html',
  styleUrls: ['./public-actor.component.css']
})
export class PublicActorComponent implements OnInit {
  private experimentId: number;
  private transactionFeeData: TransactionFeeEntry[];
  constructor(
    private data: DataProvisionService,
    private ess: ExperimentStateService) { }

  ngOnInit() {
    this.experimentId = this.ess.experimentID;
    this.transactionFeeData = this.data.getMockPublicActorData();
  }

}
