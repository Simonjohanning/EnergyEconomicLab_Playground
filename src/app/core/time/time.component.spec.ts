import { ExperimentStateService } from '../experiment-state.service';
import { MockEDMService } from '../mock-edm.service';
import { TimeService } from '../time.service';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TimeComponent } from './time.component';
import {DataProvisionService} from '../data-provision.service';
import {By} from '@angular/platform-browser';

class MockExperimentStateService extends ExperimentStateService {}

class MockedMockEDMService extends MockExperimentStateService {}

class MockTimeService extends TimeService {}

describe('Component: Time', () => {

  let timeComponent: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;
  let testBedExperimentStateService: ExperimentStateService;
  let timeComponentExperimentStateService: ExperimentStateService;
  let testBedMockEDMService: MockEDMService;
  let timeComponentMockEDMService: MockEDMService;
  let testBedTimeService: TimeService;
  let timeComponentTimeService: TimeService;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [TimeComponent],
      providers: [
        ExperimentStateService,
        MockEDMService,
        TimeService
      ]
    });
    // Configure the component with another set of Providers
    TestBed.overrideComponent(
      TimeComponent,
      {set: {providers: [
            {provide: ExperimentStateService, useClass: MockExperimentStateService},
            {provide: MockEDMService, useClass: MockedMockEDMService},
            {provide: TimeService, useClass: MockTimeService}
            ]}});

    // create component and test fixture
    fixture = TestBed.createComponent(TimeComponent);
    fixture.detectChanges();

    // get test component from the fixture
    timeComponent = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedExperimentStateService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the TimeComponent (should return MockExperimentStateService)
    timeComponentExperimentStateService = fixture.debugElement.injector.get(ExperimentStateService);

    // MockEDMService provided to the TestBed
    testBedMockEDMService = TestBed.get(MockEDMService);

    // MockEDMService provided by the TimeComponent (should return MockedMockEDMService)
    timeComponentMockEDMService = fixture.debugElement.injector.get(MockEDMService);

    // TimeService provided to the TestBed
    testBedTimeService = TestBed.get(TimeService);

    // TimeService provided by the TimeComponent (should return MockTimeService)
    timeComponentTimeService = fixture.debugElement.injector.get(TimeService);
  });

  it('TimeComponent exists', () => {
    expect(timeComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance for ExperimentStateService',
    inject([ExperimentStateService], (injectService: ExperimentStateService) => {
      expect(injectService).toBe(testBedExperimentStateService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentStateService', () => {
    expect(timeComponentExperimentStateService instanceof MockExperimentStateService).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance for MockEDMService',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedMockEDMService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(timeComponentMockEDMService instanceof MockedMockEDMService).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance for TimeService',
    inject([TimeService], (injectService: TimeService) => {
      expect(injectService).toBe(testBedTimeService);
    })
  );

  it('Service injected via component should be an instance of MockTimeService', () => {
    expect(timeComponentTimeService instanceof MockTimeService).toBeTruthy();
  });

  // as of now it is impossible to set the time regime to anything but discrete - omitting continuous
  it('should have the correct time and progress displayed when time regime is discrete', () => {
    let length: number;
    DataProvisionService.getExperimentLength().subscribe(time => length = time);
    let actualTime = 0;

    // timeComponentTimeService = fixture.debugElement.injector.get(TimeService);
    // TimeService provided by the TimeComponent (should return MockTimeService)
    timeComponentTimeService.timeEmitter.subscribe(newTime => {
      actualTime = newTime;
    });
    const elementTimeRatio = fixture.debugElement.query(By.css('.timeDisplay'));
    expect(elementTimeRatio.nativeElement.textContent.trim()).toEqual('discrete time:' + actualTime + ' /' + length);

    // testBedTimeService = TestBed.get(TimeService); TimeService provided to the TestBed
    testBedTimeService.advanceTime(1);
    expect(elementTimeRatio.nativeElement.textContent.trim()).toEqual('discrete time:' + actualTime + ' /' + length);
  });
});
