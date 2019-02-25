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
export class BidDetailComponent implements OnInit {

  @Input() bid: P2PBid;
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  constructor(private bts: BlockchainTransactionService,
              private sessionData: ExperimentStateService,
              private timeService: TimeService) { }

  ngOnInit() {
  }

  public purchase(): void {
    this.bts.commitToP2PBid(this.sessionData.getCurrentProsumer(), this.timeService.getCurrentTime(), this.bid);
    this.removeComponent.emit();
  }

}
