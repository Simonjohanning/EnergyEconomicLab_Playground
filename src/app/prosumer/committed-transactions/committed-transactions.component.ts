import { Component, OnInit } from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {P2PBid} from '../../core/data-types/P2PBid';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-committed-transactions',
  templateUrl: './committed-transactions.component.html',
  styleUrls: ['./committed-transactions.component.css']
})
export class CommittedTransactionsComponent implements OnInit {

  respectiveBids: P2PBid[] = [];
  constructor(private bts: BlockchainTransactionService) { }

  ngOnInit() {
    this.bts.committedBidSubject.subscribe(bid => this.respectiveBids.push(bid));
  }
}
