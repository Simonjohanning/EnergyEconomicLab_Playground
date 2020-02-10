import { ExperimentInstanceEditorComponent } from './experiment-instance-editor.component';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MockEDMService } from '../../core/mock-edm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {By} from '@angular/platform-browser';

class MockedMockEDMService extends MockEDMService {}

describe('Comp: ExperimentInstanceLoader', () => {
  let experimentInstanceEditorComponent: ExperimentInstanceEditorComponent;
  let fixture: ComponentFixture<ExperimentInstanceEditorComponent>;
  let componentService: MockEDMService;
  let testBedService: MockEDMService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentInstanceEditorComponent],
      providers: [MockEDMService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
      ],
    });
    TestBed.overrideComponent(
      ExperimentInstanceEditorComponent,
      {set: {providers: [{provide: MockEDMService, useClass: MockedMockEDMService}]}}
    );
    TestBed.compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(ExperimentInstanceEditorComponent);
    fixture.detectChanges();

    // get test component from the fixture
    experimentInstanceEditorComponent = fixture.componentInstance;

    // MockEDMService provided to the TestBed
    testBedService = TestBed.get(MockEDMService);

    // MockEDMService provided by the ExperimentInstanceEditorComponent (should return MockedMockEDMService)
    componentService = fixture.debugElement.injector.get(MockEDMService);
  });

  it('ExperimentInstanceEditorComponent exists', () => {
    expect(experimentInstanceEditorComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(componentService instanceof MockedMockEDMService).toBeTruthy();
  });

  it('after choosing an experiment instance from MockEDMService and clicking suggest ID button, the save button has to be shown', () => {

    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('#dropdown')).nativeElement;
    selectEl.value = selectEl.options[0].value;
    selectEl.dispatchEvent(new Event('change'));

    const suggestIDButton = fixture.debugElement.query(By.css('#buttonSuggestID'));
    suggestIDButton.triggerEventHandler('click', {});

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('#saveButton'))).toBeTruthy();
    });
  });

});
