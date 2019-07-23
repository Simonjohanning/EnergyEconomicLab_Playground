import { Component, OnInit } from '@angular/core';
import {P2PMarketDesign} from '../../core/data-types/P2PMarketDesign';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Subject} from 'rxjs';
import {Prosumer} from '../../core/data-types/Prosumer';

@Component({
  selector: 'app-p2p-marketdesign-editor',
  templateUrl: './p2p-marketdesign-editor.component.html',
  styleUrls: ['./p2p-marketdesign-editor.component.css']
})
export class P2pMarketdesignEditorComponent implements OnInit {

  public preliminaryP2PMarketDesign: P2PMarketDesign;

  private p2pMarketDesignForm = new FormGroup(
    {
      bidClosure: new FormControl('', this.bidClosureValidator()),
      timeSliceLength: new FormControl('', this.timeSliceLengthValidator()),
      minBidSize: new FormControl('', this.minBidSizeValidator()),
      maxPrice: new FormControl('', this.maxPriceValidator()),
      feeAmount: new FormControl('', this.feeAmountValidator())
    });

  constructor() { }

  public formValid(): boolean{
    return this.p2pMarketDesignForm.valid;
  }

  ngOnInit() {
  }

  // TODO define validator properly
  bidClosureValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value <= 0) {
        return {
          bidClosureIssue: 'bidClosure needs to be a positive value in order to make sense'
        };
      } else { return null; }
    };
  }

  // TODO definde validator properly
  timeSliceLengthValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value <= 0) {
        return {
          timeSliceLengthIssue: 'timeSliceLength needs to be a positive value in order to make sense'
        };
      } else { return null; }
    };
  }

  // TODO definde validator properly
  minBidSizeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          minBidSizeIssue: 'minBidSize needs to be a non-negative value in order to make sense'
        };
      } else { return null; }
    };
  }

  // TODO definde validator properly
  maxPriceValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value <= 0) && (control.value !== -1)) {
        return {
          maxPriceIssue: 'maxPrice needs to be a positive value (or -1 to signify absence) in order to make sense'
        };
      } else { return null; }
    };
  }

  // TODO definde validator properly
  feeAmountValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value < 0) || (control.value >= 1 )) {
        return {
          feeAmountIssue: 'feeAmount needs to be in teh unit interval in order to make sense'
        };
      } else { return null; }
    };
  }

}
