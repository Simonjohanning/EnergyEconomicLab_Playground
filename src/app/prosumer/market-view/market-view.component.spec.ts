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
});
