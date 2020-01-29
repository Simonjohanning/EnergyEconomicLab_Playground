import { NCGEditorComponent } from './ncgeditor.component';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MockEDMService } from '../../core/mock-edm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class MockedMockEDMService extends MockEDMService {}

describe('Comp: NCGEditor', () => {

  let ncgEditorComponent: NCGEditorComponent;
  let fixture: ComponentFixture<NCGEditorComponent>;
  let testBedService: MockEDMService;
  let ncgEditorService: MockEDMService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [NCGEditorComponent],
      providers: [
        MockEDMService,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
      ]
    });
    TestBed.overrideComponent(
      NCGEditorComponent,
      {set: {providers: [{provide: MockEDMService, useClass: MockedMockEDMService}]}}
    );
    TestBed.compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(NCGEditorComponent);

    // get test component from the fixture
    ncgEditorComponent = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedService = TestBed.get(MockEDMService);

    // MockEDMService provided by the NCGEditorComponent (should return MockExperimentStateService)
    ncgEditorService = fixture.debugElement.injector.get(MockEDMService);
  });

  it('NCGEditorComponent exists', () => {
    expect(ncgEditorComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(ncgEditorService instanceof MockedMockEDMService).toBeTruthy();
  });

});
