import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BidValidationService } from '../../core/bid-validation.service';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';
import { ExperimentStateService } from '../../core/experiment-state.service';
import { P2POption } from '../../core/data-types/P2POption';

@Component({
  selector: 'app-p2p-bid-editor',
  templateUrl: './p2p-bid-editor.component.html',
  styleUrls: ['./p2p-bid-editor.component.css']
})

// TODO Implement bid strategy bot stuff

/**
 * Component to provide the form that can be used to create a new bid in the P2P market
 */
export class P2PBidEditorComponent implements OnInit {
  /** The respective form group used to contain and manage the data regarding the respective bid */
  private bidForm = new FormGroup(
    {
      feedInTime: new FormControl('', (control: AbstractControl) => this.validationService.fitValidator(control)),
      duration: new FormControl('', (control: AbstractControl) => this.validationService.durationValidator(control)),
      power: new FormControl('', (control: AbstractControl) => this.validationService.powerValidator(control)),
      price: new FormControl('', (control: AbstractControl) => this.validationService.priceValidator(control))
    });
  /** Helper variable to display errors within the form */
  private formError = '';
  constructor(private validationService: BidValidationService,
              private bts: BlockchainTransactionService,
              private sessionData: ExperimentStateService) {
  }

  ngOnInit() {
  }

  /**
   * Method to create the bid, check it for validity and if so, send it to the bts.
   * If the bid does not validate, it provides information about issues with the bid through the formError variable
   */
  private submitBid(): void {
    console.log('in submit bid');
    const bidInQuestion: P2POption = {
      id: this.bts.getUnusedBidId(),
      optionCreator: this.sessionData.getCurrentProsumer(),
      deliveryTime: this.bidForm.value.feedInTime,
      duration: this.bidForm.value.duration,
      price: this.bidForm.value.price,
      power: this.bidForm.value.power
    };
    console.log(bidInQuestion);
    if (this.validationService.checkBidValidity(bidInQuestion)) {
      this.bts.submitBid(bidInQuestion);
    } else {
      console.log('validation service should be false, is ' + this.validationService.checkBidValidity(this.bidForm.value));
      console.log(this.validationService.getBidValidityErrors(bidInQuestion));
      this.formError = this.validationService.getBidValidityErrors(bidInQuestion).reduce((string1, string2) => string1 + string2);
    }
  }


  // TODO submitAsk()!!!
}
