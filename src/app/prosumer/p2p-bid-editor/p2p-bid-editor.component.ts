import { Component, OnInit } from '@angular/core';
import {P2PBid} from '../../core/data-types/P2PBid';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {BidValidationService} from '../../core/bid-validation.service';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {Prosumer} from '../../core/data-types/Prosumer';
import {DataProvisionService} from '../../core/data-provision.service';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {TimeService} from '../../core/time.service';
import {P2PMarketDesign} from '../../core/data-types/P2PMarketDesign';
import {MockEDMService} from '../../core/mock-edm.service';

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
    this.bidForm.valueChanges.subscribe(foo => {
/*      console.log('Bid form observable says foo');
      console.log('Bid form is ' + this.bidForm);
      console.log('fit in bidForm is' + this.bidForm.get('feedInTime'));
      console.log(this.bidForm.get('feedInTime').errors);
      console.log(this.bidForm.get('feedInTime').errors.fitIssue);*/
    });
  }

  private submitBid(): void {
    if (this.validationService.checkBidValidity(this.bidForm.value)) {
      this.bts.commitBid({
        id: this.bts.getUnusedBidId(),
        provider: this.sessionData.getCurrentProsumer(),
        deliveryTime: this.bidForm.value.feedInTime,
        duration: this.bidForm.value.duration,
        price: this.bidForm.value.price,
        power: this.bidForm.value.power
      });
    } else {
      this.formError = this.validationService.getBidValidityErrors(this.bidForm.value);
    }
  }
}
