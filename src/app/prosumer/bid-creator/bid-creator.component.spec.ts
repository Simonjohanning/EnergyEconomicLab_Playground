import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidCreatorComponent } from './bid-creator.component';

describe('BidCreatorComponent', () => {
  let component: BidCreatorComponent;
  let fixture: ComponentFixture<BidCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
