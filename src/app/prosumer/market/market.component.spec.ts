import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketComponent } from './market.component';
import {MarketViewComponent} from '../market-view/market-view.component';
import {P2PBidEditorComponent} from '../p2p-bid-editor/p2p-bid-editor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BidDetailComponent} from '../bid-detail/bid-detail.component';
import {CommittedTransactionsComponent} from '../committed-transactions/committed-transactions.component';

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ MarketComponent, MarketViewComponent, P2PBidEditorComponent, BidDetailComponent, CommittedTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
