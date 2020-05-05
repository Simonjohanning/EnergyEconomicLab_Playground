import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataProvisionService } from '../../core/data-provision.service';
import { TimeService } from '../../core/time.service';
import { ExperimentStateService } from '../../core/experiment-state.service';
import { P2PMarketDesign } from '../../core/data-types/P2PMarketDesign';
import { P2POption } from '../../core/data-types/P2POption';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';

@Component({
  selector: 'app-ask-view',
  templateUrl: './ask-view.component.html',
  styleUrls: ['./ask-view.component.css']
})

export class AskViewComponent implements OnInit {
  /** Variable to store the asks to be shown in the view */
  private  relevantAsks: P2POption[] = [];
  /** Form to allow for filtering the ask relevant for the view */
  private askFilterForm = new FormGroup(
    {
      maxPrice: new FormControl(''),
      minFeedOutTime: new FormControl(''),
      maxFeedOutTime: new FormControl(''),
      minDuration: new FormControl(''),
      maxDuration: new FormControl(''),
      minPower: new FormControl(''),
      maxPower: new FormControl('')
    });

  /** variable to store the market design of the considered market */
  private p2pMarketDesign: P2PMarketDesign;
  /** Helper variable to determine the maximal price of an ask (could be different from the value in the market design */
  private marketMaxPrice: number;
  /** Helper variable to determine the maximal size of an ask */
  private maxAskSize: number;
  /** reference variable to store which was the last slider the user changed */
  private latestChangeSlider = '';

  /** reference variable to refer to the ask currently selected in the view */
  private selectedAsk: P2POption;

  constructor(private bts: BlockchainTransactionService,
              private timeService: TimeService,
              private sessionData: ExperimentStateService,
              private dataProvisionService: DataProvisionService) {
  }

  ngOnInit() {
    // subscribe to the emitter of open asks to be able to update the view
    this.bts.openAskSubject.subscribe(openAsks => {
      console.log('New open asks next in market view: ' + openAsks.length + ' open asks.');
      this.relevantAsks = openAsks.filter(ask => this.conformsToFilter(ask));
    });
    DataProvisionService.getExperimentLength().subscribe(length => {
      this.askFilterForm.get('maxFeedOutTime').setValue(length);
      this.askFilterForm.get('maxDuration').setValue(length);
    });
    this.askFilterForm.get('maxPower').setValue(1000);
    this.askFilterForm.valueChanges.subscribe(() => this.checkBounds());
    DataProvisionService.getP2PMarketDescription(this.sessionData.experimentID).subscribe(p2pMarketDescription => {
      this.p2pMarketDesign = p2pMarketDescription;
      this.askFilterForm.get('minFeedOutTime').setValue(this.p2pMarketDesign.askClosure);
      this.askFilterForm.get('minDuration').setValue(this.p2pMarketDesign.timeSliceLength);
      this.askFilterForm.get('minPower').setValue(this.p2pMarketDesign.minAskSize);
      if (p2pMarketDescription.maxPrice === -1) {
        this.marketMaxPrice = 10000;
      } else { this.marketMaxPrice = p2pMarketDescription.maxPrice; }
      this.askFilterForm.get('maxPrice').setValue(this.marketMaxPrice);
    });
    this.dataProvisionService.getMaxAskSize().subscribe(size => {
      this.maxAskSize = size;
    });
  }

  /**
   * Helper method to check the bounds of the last changed slider.
   * If the slider was moved out of bounds (e.g. max/min order reversed), it is corrected.
   * Consecutively, the relevant asks are filtered according to a filter adjusted to the last slider modified
   */
  private checkBounds(): void {
    switch (this.latestChangeSlider) {
      case 'maxFeedOutTime':
        this.checkMaxFIT();
        break;
      case 'minFeedOutTime':
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
    // Filter out asks not compliant with the respective filters
    this.relevantAsks = this.bts.getOpenAsks().filter(ask => this.conformsToFilter(ask));
  }

  /**
   * Method to check whether a ask conforms to a number of criteria set by the respective form.
   * A ask is invalid if either
   * - the delivery time lies outside [minimalFIT, maximalFIT]
   * - the power lies outside [minimalPower, maximalPower]
   * - the duration lies outside [minimalDuration, maximalDuration]
   * - the ask price exceeds the maximal ask price
   * @param askToFilter The ask that is to be filtered for form-based filter compliance
   * @returns true if the ask conforms to all filter criteria, false if it violates at least one
   */
  private conformsToFilter(askToFilter: P2POption): boolean {
    if ((askToFilter.deliveryTime < this.askFilterForm.value.minFeedOutTime) || (askToFilter.deliveryTime > this.askFilterForm.value.maxFeedOutTime)) {
      return false;
    } else if ((askToFilter.power < this.askFilterForm.value.minPower) || (askToFilter.deliveryTime > this.askFilterForm.value.maxPower)) {
      return false;
    } else if ((askToFilter.duration < this.askFilterForm.value.minDuration) || (askToFilter.duration > this.askFilterForm.value.maxDuration)) {
      return false;
    } else if (askToFilter.price > this.askFilterForm.value.maxPrice) {
      return false;
    } else {
      return true;
    }
  }


  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMaxFIT() {
    if (this.askFilterForm.value.minFeedOutTime > this.askFilterForm.value.maxFeedOutTime) { this.askFilterForm.get('maxFeedOutTime').setValue(this.askFilterForm.value.minFeedOutTime); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMinFIT() {
    if (this.askFilterForm.value.minFeedOutTime > this.askFilterForm.value.maxFeedOutTime) { this.askFilterForm.get('minFeedOutTime').setValue(this.askFilterForm.value.maxFeedOutTime); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMaxDuration() {
    if (this.askFilterForm.value.minDuration > this.askFilterForm.value.maxDuration) { this.askFilterForm.get('maxDuration').setValue(this.askFilterForm.value.minDuration); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMinDuration() {
    if (this.askFilterForm.value.minDuration > this.askFilterForm.value.maxDuration) { this.askFilterForm.get('minDuration').setValue(this.askFilterForm.value.maxDuration); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMaxPower() {
    if (this.askFilterForm.value.minPower > this.askFilterForm.value.maxPower) { this.askFilterForm.get('maxPower').setValue(this.askFilterForm.value.minPower); }
  }

  /**
   * Method to correct invalid bounds (min>max) to equal value
   */
  private checkMinPower() {
    if (this.askFilterForm.value.minPower > this.askFilterForm.value.maxPower) { this.askFilterForm.get('minPower').setValue(this.askFilterForm.value.maxPower); }
  }

  /**
   * Helper method to set the current ask as the selected ask
   *
   * @param askToDisplay ask to set as selected ask
   */
  setSelectedAsk(askToDisplay: P2POption) {
    this.selectedAsk = askToDisplay;
  }

  /**
   * Method to reset the selected ask variable (to null)
   */
  public resetAsk(): void {
    this.selectedAsk = null;
  }

}
