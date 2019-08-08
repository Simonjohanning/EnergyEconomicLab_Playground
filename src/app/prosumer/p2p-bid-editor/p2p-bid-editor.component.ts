import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {BidValidationService} from '../../core/bid-validation.service';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {DataProvisionService} from '../../core/data-provision.service';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {TimeService} from '../../core/time.service';
import {MockEDMService} from '../../core/mock-edm.service';
import {P2PBid} from '../../core/data-types/P2PBid';

@Component({
  selector: 'app-p2p-bid-editor',
  templateUrl: './p2p-bid-editor.component.html',
  styleUrls: ['./p2p-bid-editor.component.css']
})
export class P2PBidEditorComponent implements OnInit {

  private bidForm = new FormGroup(
    {
      feedInTime: new FormControl('', (control: AbstractControl) => this.validationService.fitValidator(control)),
      duration: new FormControl('', (control: AbstractControl) => this.validationService.durationValidator(control)),
      power: new FormControl('', (control: AbstractControl) => this.validationService.powerValidator(control)),
      price: new FormControl('', (control: AbstractControl) => this.validationService.priceValidator(control))
    });
  private formError = '';
  constructor(private validationService: BidValidationService,
              private bts: BlockchainTransactionService,
              private sessionData: ExperimentStateService,
              private timeService: TimeService,
              private edmService: MockEDMService,
              private dataProvisionService: DataProvisionService) {
  }

  ngOnInit() {
  }

  private submitBid(): void {
    const bidInQuestion: P2PBid = {
      id: this.bts.getUnusedBidId(),
      provider: this.sessionData.getCurrentProsumer(),
      deliveryTime: this.bidForm.value.feedInTime,
      duration: this.bidForm.value.duration,
      price: this.bidForm.value.price,
      power: this.bidForm.value.power
    };
    if (this.validationService.checkBidValidity(bidInQuestion)) {
      this.bts.commitBid(bidInQuestion);
    } else {
      console.log('vaidation service should be false, is ' + this.validationService.checkBidValidity(this.bidForm.value));
      console.log(this.validationService.getBidValidityErrors(bidInQuestion));
      this.formError = this.validationService.getBidValidityErrors(bidInQuestion).reduce((string1, string2) => string1 + string2);
    }
  }
}
