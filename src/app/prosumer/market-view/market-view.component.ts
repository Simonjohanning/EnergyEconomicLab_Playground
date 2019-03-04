import { Component, OnInit } from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {TimeService} from '../../core/time.service';
import {P2PBid} from '../../core/data-types/P2PBid';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {MockEDMService} from '../../core/mock-edm.service';
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
  private marketMaxPrice: number;
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
              private edmService: MockEDMService,
              private dataProvisionService: DataProvisionService) { this.sessionData.setDefaultProsumer(); }

  ngOnInit() {
    // this.bts.commitedBidSubject.subscribe(bidArray => this.respectiveBids = bidArray);
    /*this.relevantBids = this.bts.getBids(this.timeService.getCurrentTime(), this.timeService.getCurrentTime() + 10);*/
    this.bts.openBidSubject.subscribe(openBids => {
      console.log('New open bids next in market view: ' + openBids.length + ' open bids.');
      this.relevantBids = openBids.filter(bid => this.conformsToFilter(bid));
    });
    this.relevantBids = this.bts.getOpenBids();
    this.bidFilterForm.get('maxPrice').setValue(0);
    this.bidFilterForm.get('minFeedInTime').setValue(0);
    this.bidFilterForm.get('maxFeedInTime').setValue(100);
    this.bidFilterForm.get('minDuration').setValue(0);
    this.bidFilterForm.get('maxDuration').setValue(100);
    this.bidFilterForm.get('minPower').setValue(0);
    this.bidFilterForm.get('maxPower').setValue(1000);
    this.bidFilterForm.valueChanges.subscribe(form => this.checkBounds(form));
    this.edmService.getP2PMarketDescription(this.dataProvisionService.experimentId).subscribe(p2pMarketDescription => {
      if (p2pMarketDescription.maxPrice === -1) {
        this.marketMaxPrice = 10000;
      } else { this.marketMaxPrice = p2pMarketDescription.maxPrice; }
    });
  }

  private checkBounds(form) {
    if (this.latestChangeSlider === 'maxFeedInTime') { this.checkMaxFIT(); }
    else if (this.latestChangeSlider === 'minFeedInTime') { this.checkMinFIT(); }
    else if (this.latestChangeSlider === 'maxDuration') { this.checkMaxDuration(); }
    else if (this.latestChangeSlider === 'minDuration') { this.checkMinDuration(); }
    else if (this.latestChangeSlider === 'maxPower') { this.checkMaxPower(); }
    else if (this.latestChangeSlider === 'minPower') { this.checkMinPower(); }
    this.syncBids();
  }

  syncBids(): void {
    this.relevantBids = this.bts.getOpenBids().filter(bid => this.conformsToFilter(bid));;
    /*console.log(this.relevantBids.length + ' bid left after filtering, with ' + this.bts.getOpenBids().length + ' bids provided by the bts');*/
  }

  private conformsToFilter(bidToFilter: P2PBid): boolean {
    /*console.log('testing bid ' + bidToFilter + ' for conformance');bidToFilter.duration > this.bidFilterForm.value.minDuration*/
    if ((bidToFilter.deliveryTime < this.bidFilterForm.value.minFeedInTime) || (bidToFilter.deliveryTime > this.bidFilterForm.value.maxFeedInTime)) {
      /*console.log('delivery time violation: Delivery time is '+bidToFilter.deliveryTime+ ', whereas min is '+this.bidFilterForm.value.minFeedInTime+' and max is '+this.bidFilterForm.value.maxFeedInTime);*/
      return false;
    } else if ((bidToFilter.power < this.bidFilterForm.value.minPower) || (bidToFilter.deliveryTime > this.bidFilterForm.value.maxPower)) {
      /*console.log('power violation: power is '+bidToFilter.power+ ', whereas min is '+this.bidFilterForm.value.minPower+' and max is '+this.bidFilterForm.value.maxPower);*/
      return false;
    } else if ((bidToFilter.duration < this.bidFilterForm.value.minDuration) || (bidToFilter.duration > this.bidFilterForm.value.maxDuration)) {
      /*console.log('duration violation: Duration is '+bidToFilter.duration+ ', whereas min is '+this.bidFilterForm.value.minDuration+' and max is '+this.bidFilterForm.value.maxDuration);
      console.log('bidToFilter.duration < this.bidFilterForm.value.minDuration is '+(bidToFilter.duration < this.bidFilterForm.value.minDuration));
      console.log('bidToFilter.duration > this.bidFilterForm.value.minDuration is '+(bidToFilter.duration > this.bidFilterForm.value.maxDuration));*/
      return false;
    } else if (bidToFilter.price > this.bidFilterForm.value.maxPrice) {
      /*console.log('Price violation: Price is '+bidToFilter.price+ ', whereas max is '+this.bidFilterForm.value.maxPrice);*/
      return false;
    } else {
      /*console.log(bidToFilter.id + ' conforms to filter');*/
      return true;
    }
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
