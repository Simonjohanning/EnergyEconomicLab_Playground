import { Component, OnInit } from '@angular/core';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';
import { P2POption } from '../../core/data-types/P2POption';

@Component({
  selector: 'app-committed-transactions',
  templateUrl: './committed-transactions.component.html',
  styleUrls: ['./committed-transactions.component.css']
})

/**
 * Component to show the transactions that were already committed to / were purchased.
 * Uses the state of the BlockchainTransactionService to acquire the data and displays them in the respective view
 */
export class CommittedTransactionsComponent implements OnInit {
  /** array to holds the bids relevant for the view */
  respectiveBids: P2POption[] = [];
  /** array to hold the asks relevant for the view */
  respectiveAsks: P2POption[] = [];

  constructor(private bts: BlockchainTransactionService) {
    this.bts.getCommitedBids().forEach(bid => this.respectiveBids.push(bid));
    this.bts.getCommitedAsks().forEach(ask => this.respectiveAsks.push(ask));
  }

  ngOnInit() {
    // subscribe to the respective component of the bts, in order to receive updates on the committed bids
    this.bts.committedBidSubject.subscribe(bid => {
      this.respectiveBids.push(bid);
    });
    this.bts.committedAskSubject.subscribe( ask => {
      this.respectiveAsks.push(ask);
    });
  }
}
