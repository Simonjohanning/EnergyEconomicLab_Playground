import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {MockEDMService} from './mock-edm.service';
import {P2PMarketDesign} from './data-types/P2PMarketDesign';
import {DataProvisionService} from './data-provision.service';
import {TimeService} from './time.service';
import {ExperimentStateService} from './experiment-state.service';
import {P2PBid} from './data-types/P2PBid';

@Injectable({
  providedIn: 'root'
})

/**
 * The bid validation service tests whether bids within the respective markets are valid based on the respective market design provided.
 * It provides a number of validators to be used in (reactive) forms for bid submission (based on AbstractControls), as well as methods to asses bids themselves
 */
export class BidValidationService {
  /** The market design for the P2P market based on the configuration of the respective experiment */
  private p2pMarketDesign: P2PMarketDesign;
  constructor(private edmService: MockEDMService,
              private dataProvisionService: DataProvisionService,
              private timeService: TimeService,
              private ets: ExperimentStateService) {
    DataProvisionService.getP2PMarketDescription(this.ets.experimentID).subscribe(p2pmd => this.p2pMarketDesign = p2pmd);
  }

  /**
   * The fitValidator can be used as a validator for an AbstractControl that represents the feed-in time of the respective bid.
   * A bid in a P2P market is considered invalid when the feed-in time lies before the current time point, or before the bid closure time of the market
   *
   * @param control An abstract control that comprises the value of the feed in time
   * @returns null if the feed-in time is valid and an object containing a string with the invalidity description as the value of the 'fitIssue' string
   */
  public fitValidator(control: AbstractControl) {
    if (control.value < this.timeService.getCurrentTime()) {
      return { fitIssue: 'Proposed bid timing must lie in the future!'};
    } else if ((this.timeService.getCurrentTime() + this.p2pMarketDesign.bidClosure) > control.value) {
      const fitIssueString = ('Bid horizon for P2P bids are ' + this.p2pMarketDesign.bidClosure.toString(10) + ', whereas the proposed time is only ' + (control.value - this.timeService.getCurrentTime()) + ' time steps ahead!');
      return { fitIssue: fitIssueString };
    } else {
      return null;
    }
  }

  /**
   * The durationValidator can be used as a validator for an AbstractControl that represents the duration of the respective bid.
   * A bid in a P2P market is considered invalid when the duration is not a multiple of the length of a time slice in the market
   *
   * @param control An abstract control that comprises the value of the feed-in duration
   * @returns null if the duration value is valid and an object containing a string with the invalidity description as the value of the 'durationIssue' string
   */
  public durationValidator(control: AbstractControl) {
    if ((control.value % this.p2pMarketDesign.timeSliceLength) !== 0) {
      console.log('control: ' + control.value + ' timeSliceLength: ' + this.p2pMarketDesign.timeSliceLength);
      const durationIssueString = ('Duration of the bid must be a multiple of ' + this.p2pMarketDesign.timeSliceLength);
      return { durationIssue: durationIssueString};
    } else {
      return null;
    }
  }

  /**
   * The powerValidator can be used as a validator for an AbstractControl that represents the feed-in power of the respective bid.
   * A bid in a P2P market is considered invalid when the provided power is smaller than the minimal bid size
   *
   * @param control An abstract control that comprises the value of the feed in time
   * @returns null if the power value is valid and an object containing a string with the invalidity description as the value of the 'powerIssue' string
   */
  public powerValidator(control: AbstractControl) {
    if (control.value < this.p2pMarketDesign.minBidSize) {
      const powerIssueString = ( 'Proposed bid must be at least ' + this.p2pMarketDesign.minBidSize.toString());
      return { powerIssue: powerIssueString};
    }  else {
      return null;
    }
  }

  /**
   * The priceValidator can be used as a validator for an AbstractControl that represents the price of the respective bid.
   * A bid in a P2P market is considered invalid when the price exceeds the price.
   *
   * @param control An abstract control that comprises the value of the feed in time
   * @returns null if the bid price is valid and an object containing a string with the invalidity description as the value of the 'priceIssue' string
   */
  public priceValidator(control: AbstractControl) {
    // A maxPrice of -1 represents the absence of a price ceiling
    if (this.p2pMarketDesign.maxPrice === -1) {
      return null;
    } else if (control.value > this.p2pMarketDesign.maxPrice) {
      const priceIssueString = ('Price cannnot exceed ' + this.p2pMarketDesign.maxPrice + ' Euro/kWh in this market design');
      return { priceIssue: priceIssueString };
    } else if (control.value < 0) {
      return {powerIssue: 'Price has to be larger than 0'};
    } else {
      return null;
    }
  }

  /**
   * Method to check the validity of a P2PBid within the given market design.
   * Does not give information on what aspect of the bid is invalid or why it is invalid.
   *
   * @param correspondingBid The bid whose validity is to be checked
   * @returns true if the bid is valid, false if it is invalid
   */
  public checkBidValidity(correspondingBid: P2PBid): boolean {
    if ((correspondingBid.deliveryTime < this.timeService.getCurrentTime()) || (this.timeService.getCurrentTime() + this.p2pMarketDesign.bidClosure) > correspondingBid.deliveryTime) {
      return false;
    } else if ((correspondingBid.duration % this.p2pMarketDesign.timeSliceLength) !== 0) {
      return false;
    } else if (correspondingBid.power < this.p2pMarketDesign.minBidSize) {
      return false;
    } else if ((correspondingBid.price > this.p2pMarketDesign.maxPrice) || ((correspondingBid.price < 0) && (correspondingBid.price !== -1))) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Method to qualify the invalidities of a P2PBid.
   * Checks the respective bids for compliance with all aspects of P2P market design, and collects all errors in an array of strings.
   *
   * @param correspondingBid The bid whose validity is to be checked
   * @returns an array of errors / non-compliant aspects of the bid (if any exist), null otherwise.
   */
  getBidValidityErrors(correspondingBid: P2PBid): string[] {
    if (this.checkBidValidity(correspondingBid)) {
      return null;
    }
    const bidIssues = String[6];
    // check for FIT issues
    if (correspondingBid.deliveryTime < this.timeService.getCurrentTime()) {
      bidIssues.push('feed-in time issue: Proposed bid timing must lie in the future, but lies in the past');
    }
    if ((this.timeService.getCurrentTime() + this.p2pMarketDesign.bidClosure) > correspondingBid.deliveryTime) {
      bidIssues.push('feed-in time issue: Bid horizon for P2P bids are ' + this.p2pMarketDesign.bidClosure.toString(10) + ', whereas the proposed time is only ' + (correspondingBid.deliveryTime - this.timeService.getCurrentTime()) + ' time steps ahead!');
    }
    // check for duration issues
    if ((correspondingBid.duration % this.p2pMarketDesign.timeSliceLength) !== 0) {
      bidIssues.push('duration issue: Duration of the bid must be a multiple of ' + this.p2pMarketDesign.timeSliceLength);
    }
    // check for power issues
    if (correspondingBid.power < this.p2pMarketDesign.minBidSize) {
      bidIssues.push('power issue: Proposed bid must be at least ' + this.p2pMarketDesign.minBidSize.toString());
    }
    // check for price issues
    if (this.p2pMarketDesign.maxPrice !== -1) {
      if (correspondingBid.price > this.p2pMarketDesign.maxPrice) {
        bidIssues.push('price issue: Price cannnot exceed ' + this.p2pMarketDesign.maxPrice + ' Euro/kWh in this market design');
      }
      if (correspondingBid.price < 0) {
        bidIssues.push('price issue: Price has to be larger than 0');
      }
    }
    return bidIssues;
  }
}
