import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketEntryComponent } from './market-entry.component';
import {P2PBid} from '../../core/data-types/P2PBid';

describe('MarketEntryComponent', () => {
  let component: MarketEntryComponent;
  let fixture: ComponentFixture<MarketEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketEntryComponent);
    component = fixture.componentInstance;
    const mockP2PBid: P2PBid =  {
      id: 1,
      provider: {id: 1},
      deliveryTime: 81,
      duration: 3,
      price: 2,
      power: 1.5
    };
    component.bidToDisplay = mockP2PBid;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
