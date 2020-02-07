import { MockEDMService } from '../../core/mock-edm.service';
import { LoadEditorComponent } from './load-editor.component';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

class MockedMockEDMService extends MockEDMService {}

describe('Component: LoadEditor', () => {

  let loadEditorComponent: LoadEditorComponent;
  let fixture: ComponentFixture<LoadEditorComponent>;
  let testBedService: MockEDMService;
  let loadEditorService: MockEDMService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadEditorComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [MockEDMService]
    });
    TestBed.overrideComponent(
      LoadEditorComponent,
      {set: {providers: [{provide: MockEDMService, useClass: MockedMockEDMService}]}}
    );
    TestBed.compileComponents();

    fixture = TestBed.createComponent(LoadEditorComponent);
    fixture.detectChanges(); // necessary for detecting input

    loadEditorComponent = fixture.componentInstance;

    // MockEDMService provided to the TestBed
    testBedService = TestBed.get(MockEDMService);

    // MockedMockEDMService provided by the LoadEditorComponent
    loadEditorService = fixture.debugElement.injector.get(MockEDMService);
  });

  it('should be created', () => {
    expect(loadEditorComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(loadEditorService instanceof MockedMockEDMService).toBeTruthy();
  });

  it('clicking reset button should call reset function', async (() => {
    spyOn(loadEditorComponent, 'resetParameters');
    const button = fixture.debugElement.query(By.css('#resetButton'));
    button.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {
      expect(loadEditorComponent.resetParameters).toHaveBeenCalled();
    });
  }));

  it('after filling in the form the store button should be clickable but not before?', () => {
    spyOn(loadEditorComponent, 'storeLoadTemplate');

    const inputModel = fixture.debugElement.query(By.css('#model'));
    const elModel = inputModel.nativeElement;

    elModel.value = 'model123';
    elModel.dispatchEvent(new Event('input'));

    const inputLoadProfile = fixture.debugElement.query(By.css('#loadProfile'));
    const elLoadProfile = inputLoadProfile.nativeElement;

    elLoadProfile.value = '0.1,1.2,2.3';
    elLoadProfile.dispatchEvent(new Event('input'));

    const inputRelativeControllability = fixture.debugElement.query(By.css('#relativeControllability'));
    const elRelativeControllability = inputRelativeControllability.nativeElement;

    elRelativeControllability.value = 0.5;
    elRelativeControllability.dispatchEvent(new Event('input'));

    const inputTemporalShiftingCapability = fixture.debugElement.query(By.css('#temporalShiftingCapability'));
    const elTemporalShiftingCapability = inputTemporalShiftingCapability.nativeElement;

    elTemporalShiftingCapability.value = 1;
    elTemporalShiftingCapability.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
       expect(loadEditorComponent.storeLoadTemplate).toHaveBeenCalled();
    });
  });
});
