import { Component, OnInit } from '@angular/core';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';
import { TimeService } from '../../core/time.service';
import { P2PBid } from '../../core/data-types/P2PBid';
import { ExperimentStateService } from '../../core/experiment-state.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DataProvisionService } from '../../core/data-provision.service';
import { P2PMarketDesign } from '../../core/data-types/P2PMarketDesign';

@Component({
  selector: 'app-market-view',
  templateUrl: './market-view.component.html',
  styleUrls: ['./market-view.component.css']
})

// TODO allow to hide the fee/levy component in the bid
// TODO think about including the historical market data component

/**
 * Component to provide filtering and the market view for the relevant bids accoring to the filter
 */
export class MarketViewComponent implements OnInit {
  /** Variable to store the bids to be shown in the view */
  private  relevantBids: P2PBid[] = [];
  /** reference variable to refer to the bid currently selected in the view */
  private selectedBid: P2PBid;
  /** variable to store the market design of the considered market */
  private p2pMarketDesign: P2PMarketDesign;
  /** Helper variable to determine the maximal price of a bid (could be different from the value in the market design */
  private marketMaxPrice: number;
  /** Helper variable to determine the maximal size of a bid */
  private maxBidSize: number;
  /** Form to allow for filtering the bid relevant for the view */
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
  /** reference variable to store which was the last slider the user changed */
  private latestChangeSlider = '';

  constructor(private bts: BlockchainTransactionService,
              private timeService: TimeService,
              private sessionData: ExperimentStateService,
              private dataProvisionService: DataProvisionService) {
  }

  ngOnInit() {
    // subscribe to the emitter of open bids to be able to update the view
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

  /**
   * Helper method to check the bounds of the last changed slider.
   * If the slider was moved out of bounds (e.g. max/min order reversed), it is corrected.
   * Consecutively, the relevant bids are filtered according to a filter adjusted to the last slider modified
   */
  private checkBounds(): void {
    switch (this.latestChangeSlider) {
      case 'maxFeedInTime':
        this.checkMaxFIT();
        break;
      case 'minFeedInTime':
        this.checkMinFIT();
        break;
      case 'maxDuration':
        this.checkMaxDuration();
        break;
      case 'minDuration':
        this.checkMinDuration();
        break;
      case 'maxPower':
        this.checkMaxPower();
        break;
      case 'minPower':
        this.checkMinPower();
        break;
    }
    // Filter out bids not compliant with the respective filters
    this.relevantBids = this.bts.getOpenBids().filter(bid => this.conformsToFilter(bid));
  }

  /**
   * Method to check whether a bid conforms to a number of criteria set by the respective form.
   * A bid is invalid if either
   * - the delivery time lies outside [minimalFIT, maximalFIT]
   * - the power lies outside [minimalPower, maximalPower]
   * - the duration lies outside [minimalDuration, maximalDuration]
   * - the bid price exceeds the maximal bid price
   * @param bidToFilter The bid that is to be filtered for form-based filter compliance
   * @returns true if the bid conforms to all filter criteria, false if it violates at least one
   */
  private conformsToFilter(bidToFilter: P2PBid): boolean {
    if ((bidToFilter.deliveryTime < this.bidFilterForm.value.minFeedInTime) || (bidToFilter.deliveryTime > this.bidFilterForm.value.maxFeedInTime)) {
      return false;
    } else if ((
      //TODO bidToFilter.power > this.bidFilterForm.value.maxPower correct?
      bidToFilter.power < this.bidFilterForm.value.minPower) || (bidToFilter.power > this.bidFilterForm.value.maxPower)) {
      return false;
    } else if ((bidToFilter.duration < this.bidFilterForm.value.minDuration) || (bidToFilter.duration > this.bidFilterForm.value.maxDuration)) {
      return false;
    } else if (bidToFilter.price > this.bidFilterForm.value.maxPrice) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Helper method to set the current bid as the selected bid
   *
   * @param bidToDisplay bid to set as selected bid
   */
  setSelectedBid(bidToDisplay: P2PBid) {
      this.selectedBid = bidToDisplay;
  }

  /**
   * Method to reset the selected bid variable (to null)
   */
  public resetBid(): void {
    this.selectedBid = null;
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMaxFIT() {
    if (this.bidFilterForm.value.minFeedInTime > this.bidFilterForm.value.maxFeedInTime) { this.bidFilterForm.get('maxFeedInTime').setValue(this.bidFilterForm.value.minFeedInTime); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMinFIT() {
    if (this.bidFilterForm.value.minFeedInTime > this.bidFilterForm.value.maxFeedInTime) {
      this.bidFilterForm.get('minFeedInTime').setValue(this.bidFilterForm.value.maxFeedInTime); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMaxDuration() {
    if (this.bidFilterForm.value.minDuration > this.bidFilterForm.value.maxDuration) { this.bidFilterForm.get('maxDuration').setValue(this.bidFilterForm.value.minDuration); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMinDuration() {
    if (this.bidFilterForm.value.minDuration > this.bidFilterForm.value.maxDuration) { this.bidFilterForm.get('minDuration').setValue(this.bidFilterForm.value.maxDuration); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMaxPower() {
    if (this.bidFilterForm.value.minPower > this.bidFilterForm.value.maxPower) { this.bidFilterForm.get('maxPower').setValue(this.bidFilterForm.value.minPower); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMinPower() {
    if (this.bidFilterForm.value.minPower > this.bidFilterForm.value.maxPower) { this.bidFilterForm.get('minPower').setValue(this.bidFilterForm.value.maxPower); }
  }
}
