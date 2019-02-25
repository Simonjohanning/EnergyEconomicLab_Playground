import { Component, OnInit } from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {TimeService} from '../../core/time.service';
import {P2PBid} from '../../core/data-types/P2PBid';
import {ExperimentStateService} from '../../core/experiment-state.service';

@Component({
  selector: 'app-market-view',
  templateUrl: './market-view.component.html',
  styleUrls: ['./market-view.component.css']
})
export class MarketViewComponent implements OnInit {

  private  relevantBids: P2PBid[];
  private selectedRowIndex = -1;
  constructor(private bts: BlockchainTransactionService,
              private timeService: TimeService,
              private sessionData: ExperimentStateService) { this.sessionData.setDefaultProsumer(); }

  ngOnInit() {
    this.relevantBids = this.bts.getBids(this.timeService.getCurrentTime(), this.timeService.getCurrentTime() + 10);
  }

  highlight(bidToDisplay: P2PBid) {
      this.selectedRowIndex = bidToDisplay.id;
      console.log(this.selectedRowIndex);
  }
}
