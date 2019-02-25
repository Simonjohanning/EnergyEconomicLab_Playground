import { Component, OnInit } from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {P2PBid} from '../../core/data-types/P2PBid';
import {ExperimentStateService} from '../../core/experiment-state.service';

@Component({
  selector: 'app-committed-transactions',
  templateUrl: './committed-transactions.component.html',
  styleUrls: ['./committed-transactions.component.css']
})
export class CommittedTransactionsComponent implements OnInit {

  respectiveBids: P2PBid[];
  constructor(private bts: BlockchainTransactionService,
              private session: ExperimentStateService) { }

  ngOnInit() {
    this.respectiveBids = this.bts.getCommittedBids(this.session.getCurrentProsumer());
  }

}
