import {Component, Input, OnInit} from '@angular/core';
import {P2PBid} from '../../core/data-types/P2PBid';

@Component({
  selector: 'app-market-entry',
  templateUrl: './market-entry.component.html',
  styleUrls: ['./market-entry.component.css']
})
export class MarketEntryComponent implements OnInit {

  @Input() bidToDisplay: P2PBid;
  constructor() { }

  ngOnInit() {
  }

}
