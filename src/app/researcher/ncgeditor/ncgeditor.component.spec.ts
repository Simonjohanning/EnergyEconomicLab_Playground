import { NCGEditorComponent } from './ncgeditor.component';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { MockEDMService } from '../../core/mock-edm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {By} from '@angular/platform-browser';

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
    fixture.detectChanges();

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

  it('clicking reset button should call reset function', async (() => {
    spyOn(ncgEditorComponent, 'resetParameters');
    const button = fixture.debugElement.query(By.css('#resetButton'));
    button.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {
      expect(ncgEditorComponent.resetParameters).toHaveBeenCalled();
    });
  }));

  it('after filling in the form the store button should be clickable but not before?', () => {
    spyOn(ncgEditorComponent, 'storeNCGTemplate');

    const inputModel = fixture.debugElement.query(By.css('#model'));
    const elModel = inputModel.nativeElement;

    elModel.value = 'model234';
    elModel.dispatchEvent(new Event('input'));

    const inputProjectedGeneration = fixture.debugElement.query(By.css('#projectedGeneration'));
    const elProjectedGeneration = inputProjectedGeneration.nativeElement;

    elProjectedGeneration.value = '2.3,3.4,4.5,5.6';
    elProjectedGeneration.dispatchEvent(new Event('input'));

    const inputPeakPower = fixture.debugElement.query(By.css('#peakPower'));
    const elPeakPower = inputPeakPower.nativeElement;

    elPeakPower.value = 7.3;
    elPeakPower.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(ncgEditorComponent.storeNCGTemplate).toHaveBeenCalled();
    });

  });
});
