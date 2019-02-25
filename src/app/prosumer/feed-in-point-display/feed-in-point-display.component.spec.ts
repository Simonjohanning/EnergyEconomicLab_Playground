import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInPointDisplayComponent } from './feed-in-point-display.component';

describe('FeedInPointDisplayComponent', () => {
  let component: FeedInPointDisplayComponent;
  let fixture: ComponentFixture<FeedInPointDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedInPointDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedInPointDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
