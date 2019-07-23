import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeLevyDisplayComponent } from './fee-levy-display.component';

describe('FeeLevyDisplayComponent', () => {
  let component: FeeLevyDisplayComponent;
  let fixture: ComponentFixture<FeeLevyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeLevyDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeLevyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Feed and levy calculation check', () => {
    xit('A transaction concerning the Prosumer increases the fee and levy count', () => {

    });

    xit('An unrelated fee and levy does not increase the count', () => {

    });

    xit('Without initial transactions the count starts at 0', () => {

    });
  });

});
