import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { PublicActorComponent } from './public-actor.component';
import {ExperimentStateService} from '../core/experiment-state.service';
import {DataProvisionService} from '../core/data-provision.service';

class MockDataProvisionService extends DataProvisionService {}

class MockExperimentStateService extends ExperimentStateService {
  experimentID = 123456;
}

describe('Component: PublicActor', () => {
  let publicActorComponent: PublicActorComponent;
  let fixture: ComponentFixture<PublicActorComponent>;
  let testBedDataProvisionService: DataProvisionService;
  let publicActorDataProvisionService: DataProvisionService;
  let testBedExperimentStateService: ExperimentStateService;
  let publicActorComponentExperimentStateService: ExperimentStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicActorComponent ],
      providers: [
        DataProvisionService,
        ExperimentStateService
      ]
    });

    TestBed.overrideComponent(
      PublicActorComponent,
      {set: {providers: [
        {provide: DataProvisionService, useClass: MockDataProvisionService},
        {provide: ExperimentStateService, useClass: MockExperimentStateService},
          ]}}
          );

    // create component and test fixture
    fixture = TestBed.createComponent(PublicActorComponent);
    fixture.detectChanges();

    // get test component from the fixture
    publicActorComponent = fixture.componentInstance;

    // DataProvisionService provided to the TestBed
    testBedDataProvisionService = TestBed.get(DataProvisionService);

    // DataProvisionService provided by the PublicActorComponent (should return MockDataProvisionService)
    publicActorDataProvisionService = fixture.debugElement.injector.get(DataProvisionService);

    // ExperimentStateService provided to the TestBed
    testBedExperimentStateService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the PublicActorComponent (should return MockExperimentStateService)
    publicActorComponentExperimentStateService = fixture.debugElement.injector.get(ExperimentStateService);
  }));

  xit('should create', () => {
    expect(publicActorComponent).toBeTruthy();
  });

  xdescribe('Services are injected correctly', () => {
    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([DataProvisionService], (injectService: DataProvisionService) => {
        expect(injectService).toBe(testBedDataProvisionService);
      })
    );

    it('Service injected via component should be an instance of MockExperimentStateService', () => {
      expect(publicActorDataProvisionService instanceof MockDataProvisionService).toBeTruthy();
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([ExperimentStateService], (injectService: ExperimentStateService) => {
        expect(injectService).toBe(testBedExperimentStateService);
      })
    );

    it('Service injected via component should be an instance of MockExperimentStateService', () => {
      expect(publicActorComponentExperimentStateService instanceof MockExperimentStateService).toBeTruthy();
    });
  });

  xdescribe('Experiment information is displayed correctly', () => {
    xit('Experiment id is displayed correctly', () => {

    });

    xit('nothing is displayed while waiting on experiment', () => {

    });
  });

  xdescribe('Transactions are displayed correctly', () => {
    xit('Placeholder is shown with no transactions', () => {

    });
    xdescribe('Individual transactions are displayed correctly', () => {
      xit('Payer id is shown correctly', () => {

      });

      xit('Amount is shown correctly', () => {

      });

      xit('ID of corresponding bid is shown correctly', () => {

      });
    });
  });
});
