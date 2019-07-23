import {Component, Input, OnInit} from '@angular/core';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {Prosumer} from '../../core/data-types/Prosumer';
import {ExperimentInstanceLoaderService} from '../../core/experiment-instance-loader.service';
import {ExperimentDescriptionService} from '../../shared/experiment-description.service';

@Component({
  selector: 'app-fee-levy-display',
  templateUrl: './fee-levy-display.component.html',
  styleUrls: ['./fee-levy-display.component.css']
})
export class FeeLevyDisplayComponent implements OnInit {

  aggregatedFees: number;
  @Input() prosumer: Prosumer;
  @Input() experimentId: number;
  constructor(private bts: BlockchainTransactionService,
              private eds: ExperimentDescriptionService) { }

  ngOnInit() {
    this.aggregatedFees = 0;
    this.bts.committedBidSubject.subscribe(newBid => {
      if (newBid.provider === this.prosumer) {
        this.aggregatedFees += (newBid.price * this.eds.getExperimentDescription(this.experimentId).p2pMarketDesign.feeAmount);
      }
    });
  }
}
