import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExogeneousPricesComponent } from './exogeneous-prices.component';

describe('ExogeneousPricesComponent', () => {
  let component: ExogeneousPricesComponent;
  let fixture: ComponentFixture<ExogeneousPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExogeneousPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExogeneousPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
