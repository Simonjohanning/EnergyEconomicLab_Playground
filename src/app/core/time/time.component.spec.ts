import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeComponent } from './time.component';
import {ExperimentStateService} from '../experiment-state.service';
import {MockEDMService} from '../mock-edm.service';
import {TimeService} from '../time.service';
import {DataProvisionService} from '../data-provision.service';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ExperimentStateService,
        MockEDMService,
        TimeService
      ],
      declarations: [TimeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Time progress', () => {
    xit('Pressing time button will progress time', () => {
    });

    xit('Pressing time button x times will progress time x steps', () => {
    });

    xit('Proportional time display works', () => {
    });

    xit('Time regime selector works', () => {
    });

    xit('Time bar display works', () => {
    });
  });
});
