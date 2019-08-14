import {Component, Input, OnInit} from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {ExperimentDescriptionService} from '../../shared/experiment-description.service';
import {TransactionClearingService} from '../../core/transaction-clearing.service';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {TransactionFeeEntry} from '../../core/data-types/TransactionFeeEntry';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-fee-levy-display',
  templateUrl: './fee-levy-display.component.html',
  styleUrls: ['./fee-levy-display.component.css']
})

/**
 * Component to show the fees and levies the respective prosumer (instance) incurred over the course of the simulation
 */
export class FeeLevyDisplayComponent implements OnInit {
  /** An array of the respective occasions that the prosumer incurred fee and levy payments for display purposes */
  private respectiveTransactionFees: Array<TransactionFeeEntry>;
  /** The observable the prosumer instance used is based upon */
  @Input() piObservable: Observable<ProsumerInstance>;
  /** The respective prosumer instance to display the fees and levies for */
  private prosumer: ProsumerInstance;

  constructor(private bts: BlockchainTransactionService,
              private eds: ExperimentDescriptionService,
              private tcs: TransactionClearingService) {
    this.respectiveTransactionFees = new Array<TransactionFeeEntry>();
  }

  ngOnInit() {
    // Subscribe to the respective emitter of the tcs for receiving newly cleared transactions (i.e. new information on paid fees and levies)
    this.tcs.newlyClearedBidEmitter.subscribe(transactionFeeEntry => {
      console.log('Receiving emission from bid emmitter, with payer being ' + transactionFeeEntry.payer.respectiveProsumer.name);
      // Filter out those fees that weren't paid by the respective prosumer
      if (this.prosumer === transactionFeeEntry.payer) {
        console.log('I is payer');
        this.respectiveTransactionFees.push(transactionFeeEntry);
        console.log(transactionFeeEntry);
      }
    });
    this.piObservable.subscribe(derivedInstance => {
      this.prosumer = derivedInstance;
    });
  }
}
