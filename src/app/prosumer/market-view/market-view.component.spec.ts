import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketViewComponent } from './market-view.component';

describe('MarketViewComponent', () => {
  let component: MarketViewComponent;
  let fixture: ComponentFixture<MarketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketViewComponent ]
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
