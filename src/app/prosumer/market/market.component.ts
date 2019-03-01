import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  private currentView = 'MarketView';
  constructor() { }

  ngOnInit() {
  }

  private changeView(newView: string): void {
    this.currentView = newView;
  }
}
