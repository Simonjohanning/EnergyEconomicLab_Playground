import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {MockEDMService} from './mock-edm.service';
import {P2PMarketDesign} from './data-types/P2PMarketDesign';
import {DataProvisionService} from './data-provision.service';
import {TimeService} from './time.service';
import {ExperimentStateService} from './experiment-state.service';

@Injectable({
  providedIn: 'root'
})
export class BidValidationService {

  private p2pMarketDesign: P2PMarketDesign;
  constructor(private edmService: MockEDMService,
              private dataProvisionService: DataProvisionService,
              private timeService: TimeService,
              private ets: ExperimentStateService) {
    DataProvisionService.getP2PMarketDescription(this.dataProvisionService.experimentId).subscribe(p2pmd => this.p2pMarketDesign = p2pmd);
  }

  public fitValidator(control: AbstractControl) {
    if (control.value < this.timeService.getCurrentTime()) {
      return { fitIssue: 'Proposed bid timing must lie in the future!'};
    } else if ((control.value - 0) < this.p2pMarketDesign.bidClosure) {
      const fitIssueString = ('Bid horizon for P2P bids are ' + this.p2pMarketDesign.bidClosure.toString(10) + ', whereas the proposed time is only ' + (control.value - 0) + ' time steps ahead!');
      return { fitIssue: fitIssueString };
    } else {
      return null;
    }
  }
  public durationValidator(control: AbstractControl) {

    if (control.value !== this.p2pMarketDesign.timeSliceLength) {
      console.log('control: ' + control.value + ' timeSliceLength: ' + this.p2pMarketDesign.timeSliceLength);
      const durationIssueString = ('Duration of the bid must be ' + this.p2pMarketDesign.timeSliceLength);
      return { durationIssue: durationIssueString};
    } else {
      return null;
    }
  }
  public powerValidator(control: AbstractControl) {
    if (control.value < this.p2pMarketDesign.minBidSize) {
      const powerIssueString = ( 'Proposed bid must be at least!' + this.p2pMarketDesign.minBidSize.toString());
      return { powerIssue: powerIssueString};
    }  else {
      return null;
    }
  }
  public priceValidator(control: AbstractControl) {
    if (this.p2pMarketDesign.maxPrice === -1) {
      return null;
    } else if (control.value > this.p2pMarketDesign.maxPrice) {
      const priceIssueString = ('Price cannnot exceed ' + this.p2pMarketDesign.maxPrice + ' Euro/kWh in this market design');
      return { priceIssue: priceIssueString };
    } else if (control.value < 0) {
      return {powerIssue: 'Value has to be larger than 0'};
    } else {
      return null;
    }
  }

  // TODO implement
  public checkBidValidity(value: any) {
    console.log(value);
    return true;
  }

  // TODO implement
  getBidValidityErrors(value: any) {
    console.log(value);
    return '';
  }
}
