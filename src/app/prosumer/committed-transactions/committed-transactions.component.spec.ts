import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommittedTransactionsComponent } from './committed-transactions.component';

describe('CommittedTransactionsComponent', () => {
  let component: CommittedTransactionsComponent;
  let fixture: ComponentFixture<CommittedTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommittedTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommittedTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
