import {Component, Input, OnInit} from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {ExperimentDescriptionService} from '../../shared/experiment-description.service';
import {TransactionClearingService} from '../../core/transaction-clearing.service';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {TransactionFeeEntry} from '../../core/data-types/TransactionFeeEntry';

@Component({
  selector: 'app-fee-levy-display',
  templateUrl: './fee-levy-display.component.html',
  styleUrls: ['./fee-levy-display.component.css']
})
export class FeeLevyDisplayComponent implements OnInit {

  respectiveTransactionFees: Array<TransactionFeeEntry>;
  @Input() prosumer: ProsumerInstance;
  @Input() experimentId: number;
  constructor(private bts: BlockchainTransactionService,
              private eds: ExperimentDescriptionService,
              private tcs: TransactionClearingService) {
    this.respectiveTransactionFees = new Array<TransactionFeeEntry>();
  }

  ngOnInit() {
    this.tcs.newlyClearedBidEmitter.subscribe(transactionFeeEntry => {
      console.log('Receiving emission from bid emmitter, with payer being ' + transactionFeeEntry.payer.respectiveProsumer.name);
      if (this.prosumer === transactionFeeEntry.payer) {
        console.log('I is payer');
        this.respectiveTransactionFees.push(transactionFeeEntry);
        console.log(transactionFeeEntry);
      }
    });
  }
}
