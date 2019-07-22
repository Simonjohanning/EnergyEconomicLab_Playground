import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInPointDisplayComponent } from './feed-in-point-display.component';
import {ConcreteCoordinates} from '../../core/data-types/ConcreteCoordinates';
import {ProsumerComponent} from '../prosumer.component';

describe('FeedInPointDisplayComponent', () => {
  let component: FeedInPointDisplayComponent;
  let fixture: ComponentFixture<FeedInPointDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ FeedInPointDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedInPointDisplayComponent);
    component = fixture.componentInstance;
    const fiCoord = {x: 10, y: 10};
    component.feedInPoint = fiCoord;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Feed in point coordinates are displayed accordingly', () => {

  });
});
