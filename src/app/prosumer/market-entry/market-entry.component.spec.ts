import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketEntryComponent } from './market-entry.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
