import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInObligationDisplayComponent } from './feed-in-obligation-display.component';

describe('FeedInObligationDisplayComponent', () => {
  let component: FeedInObligationDisplayComponent;
  let fixture: ComponentFixture<FeedInObligationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedInObligationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedInObligationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Feed-In obigation calculation test', () => {
    xit('newly committed bid updates the precalculated obligation', () => {

    });

    xit('obligation for a new bid is upheld / calculated for the entire duration of the commited bid', () => {

    });
  });
});
