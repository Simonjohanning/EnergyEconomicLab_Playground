import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {DataProvisionService} from '../core/data-provision.service';
import {ExperimentInstanceLoaderService} from '../core/experiment-instance-loader.service';
import {TransactionFeeEntry} from '../core/data-types/TransactionFeeEntry';
import {ExperimentStateService} from '../core/experiment-state.service';
import {TransactionClearingService} from '../core/transaction-clearing.service';

@Component({
  selector: 'app-public-actor',
  templateUrl: './public-actor.component.html',
  styleUrls: ['./public-actor.component.css']
})

/**
 * (Top-level) component for the view of the public actor.
 * Shows a list of all fees collected from transactions within the respective simulation
 */
export class PublicActorComponent implements OnInit {
  /** The identifier of the experiment concluded */
  private experimentId: number;
  /** A local set of data for the transaction fee entries */
  private transactionFeeData: Set<TransactionFeeEntry>;
  constructor(
    private data: DataProvisionService,
    private ess: ExperimentStateService,
    private tcs: TransactionClearingService) { }

  ngOnInit() {
    this.experimentId = this.ess.experimentID;
    this.transactionFeeData = this.data.getMockPublicActorData();
  }

}
