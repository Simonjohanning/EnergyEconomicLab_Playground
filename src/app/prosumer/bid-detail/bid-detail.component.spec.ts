import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidDetailComponent } from './bid-detail.component';

describe('BidDetailComponent', () => {
  let component: BidDetailComponent;
  let fixture: ComponentFixture<BidDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Bids are displayed properly', () => {

  });

  xdescribe('Displayed bids are purchased on button interaction', () => {
    xit('BTS is called properly', () => {

    });

    xit('Display element is removed on activation', () => {

    });
  });
});
