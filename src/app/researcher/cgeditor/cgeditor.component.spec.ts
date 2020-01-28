import { CGEditorComponent } from './cgeditor.component';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MockEDMService } from '../../core/mock-edm.service';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

class MockedMockEDMService extends MockEDMService {}

describe('Comp: CGEditor', () => {

  let cgEditorComponent: CGEditorComponent;
  let fixture: ComponentFixture<CGEditorComponent>;
  let testBedService: MockEDMService;
  let cgEditorService: MockEDMService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [CGEditorComponent],
      providers: [
        MockEDMService,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
    TestBed.overrideComponent(
      CGEditorComponent,
      {set: {providers: [{provide: MockEDMService, useClass: MockedMockEDMService}]}}
    );
    TestBed.compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(CGEditorComponent);

    // get test component from the fixture
    cgEditorComponent = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedService = TestBed.get(MockEDMService);

    // MockEDMService provided by the CGEditorComponent (should return MockExperimentStateService)
    cgEditorService = fixture.debugElement.injector.get(MockEDMService);
  });

  it('CGEditorComponent exists', () => {
    expect(cgEditorComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(cgEditorService instanceof MockedMockEDMService).toBeTruthy();
  });

});

// TODO setParameters(), resetParameters(), storeCGTemplate(), modelValidator
