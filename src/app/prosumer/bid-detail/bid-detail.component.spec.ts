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
});
