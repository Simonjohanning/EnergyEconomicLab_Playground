import { Component, OnInit } from '@angular/core';
// import { P2PMarketDesign } from '../../core/data-types/P2PMarketDesign';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-p2p-marketdesign-editor',
  templateUrl: './p2p-marketdesign-editor.component.html',
  styleUrls: ['./p2p-marketdesign-editor.component.css']
})

/**
 * Component to describe a P2P market design for experiments.
 * Provides inputs and validation logic for the respective data to use it.
 * In order for a p2p market design to be valid, the bidClosure, timeSliceLength and minBidSize need to be non-negative, the maxPrice must be non-negative (or -1 to signify the lack of a price cap) and the fee amount must be within the unit interval.
 */
export class P2pMarketdesignEditorComponent implements OnInit {
  /** container variable to hold the market design for the parent component to access */
  // public preliminaryP2PMarketDesign: P2PMarketDesign;
  /** Form group to hold the form information of the market design to develop */
  private p2pMarketDesignForm = new FormGroup(
    {
      bidClosure: new FormControl('', this.bidClosureValidator()),
      timeSliceLength: new FormControl('', this.timeSliceLengthValidator()),
      minBidSize: new FormControl('', this.minBidSizeValidator()),
      maxPrice: new FormControl('', this.maxPriceValidator()),
      feeAmount: new FormControl('', this.feeAmountValidator())
    });

  constructor() { }

  /**
   * Method to check whether the form is valid.
   * Is accessible from mother component as well and necessary to allow for the parent component to assess the validity of the form
   *
   * @returns the validity of the form group
   */
  /*
  public formValid(): boolean {
    return this.p2pMarketDesignForm.valid;
  }

  ngOnInit() {
  }*/

  /**
   * Validator for determining the validity of the bidClosure parameterization.
   * bidClosure is valid if it is a positive value (i.e. lies in the future)
   */
  bidClosureValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value <= 0) {
        return {
          bidClosureIssue: 'bidClosure needs to be a positive value in order to make sense'
        };
      } else { return null; }
    };
  }

  /**
   * Validator for determining the validity of the timeSliceLength parameterization.
   * timeSliceLength is valid if it is a positive value (i.e. lies in the future)
   */
  timeSliceLengthValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value <= 0) {
        return {
          timeSliceLengthIssue: 'timeSliceLength needs to be a positive value in order to make sense'
        };
      } else { return null; }
    };
  }

  /**
   * Validator for determining the validity of the minBidSize parameterization.
   * minBidSize is valid if it is a non-negative value
   */
  minBidSizeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          minBidSizeIssue: 'minBidSize needs to be a non-negative value in order to make sense'
        };
      } else { return null; }
    };
  }

  /**
   * Validator for determining the validity of the maxPrice parameterization.
   * maxPrice is valid if it is a positive value or -1 (for no price cap on the market)
   */
  maxPriceValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value <= 0) && (control.value !== -1)) {
        return {
          maxPriceIssue: 'maxPrice needs to be a positive value (or -1 to signify absence) in order to make sense'
        };
      } else { return null; }
    };
  }

  /**
   * Validator for determining the validity of the feeAmountV parameterization.
   * feeAmountV is valid if it is within the unit interval
   */
  feeAmountValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value < 0) || (control.value >= 1 )) {
        return {
          feeAmountIssue: 'feeAmount needs to be in the unit interval in order to make sense'
        };
      } else { return null; }
    };
  }

  ngOnInit(): void {
  }

}
