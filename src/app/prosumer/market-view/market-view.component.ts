import { Component } from '@angular/core';

@Component({
  selector: 'app-market-view',
  templateUrl: './market-view.component.html',
  styleUrls: ['./market-view.component.css']
})

// TODO allow to hide the fee/levy component in the bid
// TODO think about including the historical market data component

/**
 * Component to provide filtering and the market view for the relevant bids accoring to the filter
 */
export class MarketViewComponent {

  /** selector string to display the respective component */
  private selected: string;

  constructor() {
  }

  public setBid() {
    this.selected = 'bid';
  }
}
