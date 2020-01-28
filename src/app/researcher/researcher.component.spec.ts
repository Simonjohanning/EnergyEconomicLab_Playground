import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {ResearcherComponent} from './researcher.component';
import {ExperimentStateService} from '../core/experiment-state.service';

class MockExperimentStateService extends ExperimentStateService {
  experimentID = 123456;
}

describe('Comp: Researcher', () => {

  let researcherComponent: ResearcherComponent;
  let fixture: ComponentFixture<ResearcherComponent>;
  let testBedService: ExperimentStateService;
  let researcherService: ExperimentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearcherComponent],
      providers: [ExperimentStateService]
    });
    TestBed.overrideComponent(
      ResearcherComponent,
      {set: {providers: [{provide: ExperimentStateService, useClass: MockExperimentStateService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(ResearcherComponent);

    // get test component from the fixture
    researcherComponent = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the GridOperatorComponent (should return MockExperimentStateService)
    researcherService = fixture.debugElement.injector.get(ExperimentStateService);
  });

  it('ResearcherComponent exists', () => {
    expect(researcherComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ExperimentStateService], (injectService: ExperimentStateService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentStateService', () => {
    expect(researcherService instanceof MockExperimentStateService).toBeTruthy();
  });

  // as the variable editorToShow is a private one and the click event is not defined either, it is not possible to test that piece of code and
});
