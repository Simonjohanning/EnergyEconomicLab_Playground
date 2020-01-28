import {GridOperatorComponent} from './grid-operator.component';
import {ExperimentStateService} from '../core/experiment-state.service';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

class MockExperimentStateService extends ExperimentStateService {
  experimentID = 123456;
}

describe('Comp: GridOperator', () => {

  let gridOperatorComponent: GridOperatorComponent;
  let fixture: ComponentFixture<GridOperatorComponent>;
  let testBedService: ExperimentStateService;
  let gridOperatorService: ExperimentStateService;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [GridOperatorComponent],
      providers: [ExperimentStateService]
    });

    // Configure the component with another set of Providers
    TestBed.overrideComponent(
      GridOperatorComponent,
      {set: {providers: [{provide: ExperimentStateService, useClass: MockExperimentStateService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(GridOperatorComponent);

    // get test component from the fixture
    gridOperatorComponent = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the GridOperatorComponent (should return MockExperimentStateService)
    gridOperatorService = fixture.debugElement.injector.get(ExperimentStateService);
  });

  it('GridOperatorComponent exists', () => {
    expect(gridOperatorComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ExperimentStateService], (injectService: ExperimentStateService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentStateService', () => {
    expect(gridOperatorService instanceof MockExperimentStateService).toBeTruthy();
  });
});
