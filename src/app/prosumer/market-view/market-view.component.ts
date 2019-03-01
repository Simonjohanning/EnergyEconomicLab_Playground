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

  private  relevantBids: P2PBid[] = [];
  private selectedBid: P2PBid;
  private minTime = 0;
  private maxTime = 85;
  constructor(private bts: BlockchainTransactionService,
              private timeService: TimeService,
              private sessionData: ExperimentStateService) { this.sessionData.setDefaultProsumer(); }

  ngOnInit() {
    // this.bts.commitedBidSubject.subscribe(bidArray => this.respectiveBids = bidArray);
    /*this.relevantBids = this.bts.getBids(this.timeService.getCurrentTime(), this.timeService.getCurrentTime() + 10);*/
    this.bts.openBidSubject.subscribe(openBids => {
      console.log('New open bids next in market view: ' + openBids.length + ' open bids.');
      this.relevantBids = openBids.filter(bid => this.conformsToFilter(bid));
    });
    this.relevantBids = this.bts.getOpenBids();
  }

  syncBids(): void {
    this.relevantBids = this.bts.getOpenBids().filter(bid => this.conformsToFilter(bid));
  }

  private conformsToFilter(bidToFilter: P2PBid): boolean {
    if ((bidToFilter.deliveryTime >= this.minTime) && (bidToFilter.deliveryTime <= this.maxTime)) { return true;
    } else { return false; }
  }

  highlight(bidToDisplay: P2PBid) {
      this.selectedBid = bidToDisplay;
  }
  public updateBids(): void {
    this.relevantBids = this.bts.getOpenBids();
  }
  public resetBid(): void {
    this.selectedBid = null;
  }
}
