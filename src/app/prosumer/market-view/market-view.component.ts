import { Component, OnInit } from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {TimeService} from '../../core/time.service';
import {P2PBid} from '../../core/data-types/P2PBid';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DataProvisionService} from '../../core/data-provision.service';
import {P2PMarketDesign} from '../../core/data-types/P2PMarketDesign';

@Component({
  selector: 'app-market-view',
  templateUrl: './market-view.component.html',
  styleUrls: ['./market-view.component.css']
})
export class MarketViewComponent implements OnInit {

  private  relevantBids: P2PBid[] = [];
  private selectedBid: P2PBid;
  private p2pMarketDesign: P2PMarketDesign;
  private marketMaxPrice: number;
  private maxBidSize: number;
  private bidFilterForm = new FormGroup(
    {
      maxPrice: new FormControl(''),
      minFeedInTime: new FormControl(''),
      maxFeedInTime: new FormControl(''),
      minDuration: new FormControl(''),
      maxDuration: new FormControl(''),
      minPower: new FormControl(''),
      maxPower: new FormControl('')
    });
  private latestChangeSlider = '';
  constructor(private bts: BlockchainTransactionService,
              private timeService: TimeService,
              private sessionData: ExperimentStateService,
              private dataProvisionService: DataProvisionService) {
  }

  ngOnInit() {
    this.bts.openBidSubject.subscribe(openBids => {
      console.log('New open bids next in market view: ' + openBids.length + ' open bids.');
      this.relevantBids = openBids.filter(bid => this.conformsToFilter(bid));
    });
    DataProvisionService.getExperimentLength().subscribe(length => {
      this.bidFilterForm.get('maxFeedInTime').setValue(length);
      this.bidFilterForm.get('maxDuration').setValue(length);
    });
    this.bidFilterForm.get('maxPower').setValue(1000);
    this.bidFilterForm.valueChanges.subscribe(form => this.checkBounds());
    DataProvisionService.getP2PMarketDescription(this.sessionData.experimentID).subscribe(p2pMarketDescription => {
      this.p2pMarketDesign = p2pMarketDescription;
      this.bidFilterForm.get('minFeedInTime').setValue(this.p2pMarketDesign.bidClosure);
      this.bidFilterForm.get('minDuration').setValue(this.p2pMarketDesign.timeSliceLength);
      this.bidFilterForm.get('minPower').setValue(this.p2pMarketDesign.minBidSize);
      if (p2pMarketDescription.maxPrice === -1) {
        this.marketMaxPrice = 10000;
      } else { this.marketMaxPrice = p2pMarketDescription.maxPrice; }
      this.bidFilterForm.get('maxPrice').setValue(this.marketMaxPrice);
    });
    this.dataProvisionService.getMaxBidSize().subscribe(size => {
      this.maxBidSize = size;
    });
  }

  private checkBounds() {
    if (this.latestChangeSlider === 'maxFeedInTime') { this.checkMaxFIT();
    } else if (this.latestChangeSlider === 'minFeedInTime') { this.checkMinFIT();
    } else if (this.latestChangeSlider === 'maxDuration') { this.checkMaxDuration();
    } else if (this.latestChangeSlider === 'minDuration') { this.checkMinDuration();
    } else if (this.latestChangeSlider === 'maxPower') { this.checkMaxPower();
    } else if (this.latestChangeSlider === 'minPower') { this.checkMinPower();
    }
    this.syncBids();
  }

  syncBids(): void {
    this.relevantBids = this.bts.getOpenBids().filter(bid => this.conformsToFilter(bid));
  }

  private conformsToFilter(bidToFilter: P2PBid): boolean {
    if ((bidToFilter.deliveryTime < this.bidFilterForm.value.minFeedInTime) || (bidToFilter.deliveryTime > this.bidFilterForm.value.maxFeedInTime)) {
      return false;
    } else if ((bidToFilter.power < this.bidFilterForm.value.minPower) || (bidToFilter.deliveryTime > this.bidFilterForm.value.maxPower)) {
      return false;
    } else if ((bidToFilter.duration < this.bidFilterForm.value.minDuration) || (bidToFilter.duration > this.bidFilterForm.value.maxDuration)) {
      return false;
    } else if (bidToFilter.price > this.bidFilterForm.value.maxPrice) {
      return false;
    } else {
      return true;
    }
  }

  highlight(bidToDisplay: P2PBid) {
      this.selectedBid = bidToDisplay;
  }

  public resetBid(): void {
    this.selectedBid = null;
  }
  private checkMaxFIT() {
    if (this.bidFilterForm.value.minFeedInTime > this.bidFilterForm.value.maxFeedInTime) { this.bidFilterForm.get('maxFeedInTime').setValue(this.bidFilterForm.value.minFeedInTime); }
  }
  private checkMinFIT() {
    if (this.bidFilterForm.value.minFeedInTime > this.bidFilterForm.value.maxFeedInTime) { this.bidFilterForm.get('minFeedInTime').setValue(this.bidFilterForm.value.maxFeedInTime); }
  }
  private checkMaxDuration() {
    if (this.bidFilterForm.value.minDuration > this.bidFilterForm.value.maxDuration) { this.bidFilterForm.get('maxDuration').setValue(this.bidFilterForm.value.minDuration); }
  }
  private checkMinDuration() {
    if (this.bidFilterForm.value.minDuration > this.bidFilterForm.value.maxDuration) { this.bidFilterForm.get('minDuration').setValue(this.bidFilterForm.value.maxDuration); }
  }
  private checkMaxPower() {
    if (this.bidFilterForm.value.minPower > this.bidFilterForm.value.maxPower) { this.bidFilterForm.get('maxPower').setValue(this.bidFilterForm.value.minPower); }
  }
  private checkMinPower() {
    if (this.bidFilterForm.value.minPower > this.bidFilterForm.value.maxPower) { this.bidFilterForm.get('minPower').setValue(this.bidFilterForm.value.maxPower); }
  }
}
