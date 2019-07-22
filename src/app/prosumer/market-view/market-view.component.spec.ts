import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketViewComponent } from './market-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BidDetailComponent} from '../bid-detail/bid-detail.component';
import {CommittedTransactionsComponent} from '../committed-transactions/committed-transactions.component';

describe('MarketViewComponent', () => {
  let component: MarketViewComponent;
  let fixture: ComponentFixture<MarketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ MarketViewComponent, BidDetailComponent, CommittedTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Market view is displayed properly', () => {

  });

  xdescribe('Form validation works', () => {

  });

  xdescribe('Form submission works', () => {

  });

  xdescribe('Slider are constricted through the entries and simulation time', () => {

  });

  xdescribe('Bids are filtered according to the slider settings', () => {

  });

  xdescribe('Bid detail is displayed accordingly', () => {

  });

  xdescribe('Committed transactions are shown', () => {

  });

  xdescribe('Bid selection works', () => {
    xit('Selected bid highlighting works', () => {

    });

    xit('Selected bid details are displayed accordingly', () => {

    });
  })
});
