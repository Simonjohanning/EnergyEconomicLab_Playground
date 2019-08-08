import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {P2PBid} from '../../core/data-types/P2PBid';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {TimeService} from '../../core/time.service';

@Component({
  selector: 'app-bid-detail',
  templateUrl: './bid-detail.component.html',
  styleUrls: ['./bid-detail.component.css']
})

/**
 * Component to display the details of a P2PBid and to provide bid commitment / purchase functionality of the detailed bid.
 * Commitment to the bid emits an event to the parent component to remove the detailed bid from the parent element
 */
export class BidDetailComponent implements OnInit {
  /** The respective P2PBid to detail */
  @Input() bid: P2PBid;
  /** An EventEmitted for removing the component from the parent element */
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  constructor(private bts: BlockchainTransactionService,
              private sessionData: ExperimentStateService,
              private timeService: TimeService) { }

  ngOnInit() {
  }

  /**
   * Method for committing to the detailed bid by the current prosumer (i.e. the one the ExperimentStateService refers to) using the BlockchainTransactionService
   * Furthermore attempts to remove the component from the parent component if successful, since it doesn't represent a bid anymore
   */
  public purchase(): void {
    if (this.bts.commitToP2PBid(this.sessionData.getCurrentProsumer(), this.timeService.getCurrentTime(), this.bid)) {
      this.removeComponent.emit();
    }
  }
}
