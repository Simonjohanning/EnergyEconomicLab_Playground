import { StorageEditorComponent } from './storage-editor.component';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { MockEDMService } from '../../core/mock-edm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {By} from '@angular/platform-browser';

class MockedMockEDMService extends MockEDMService {}

describe('Component: Storage Editor', () => {

  let compStorageEditor: StorageEditorComponent;
  let fixture: ComponentFixture<StorageEditorComponent>;
  let testBedService: MockEDMService;
  let componentService: MockEDMService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageEditorComponent],
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
      StorageEditorComponent,
      {set: {providers: [{provide: MockEDMService, useClass: MockedMockEDMService}]}}
    );
    TestBed.compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(StorageEditorComponent);
    fixture.detectChanges();

    // get test component from the fixture
    compStorageEditor = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedService = TestBed.get(MockEDMService);

    // MockEDMService provided by the NCGEditorComponent (should return MockExperimentStateService)
    componentService = fixture.debugElement.injector.get(MockEDMService);
  });

  it('StorageEditorComponent exists', () => {
    expect(compStorageEditor).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(componentService instanceof MockedMockEDMService).toBeTruthy();
  });

  it('clicking reset button should call reset function', async (() => {
    spyOn(compStorageEditor, 'resetParameters');
    const button = fixture.debugElement.query(By.css('#resetButton'));
    button.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {
      expect(compStorageEditor.resetParameters).toHaveBeenCalled();
    });
  }));

  // TODO spy on save nach korrektem input
  it('after filling in the form the store button should be clickable but not before?', () => {
    spyOn(compStorageEditor, 'storeStorageTemplate');

    const elModel = fixture.debugElement.query(By.css('#model')).nativeElement;
    elModel.value = 'model124';
    elModel.dispatchEvent(new Event('input'));

    const elStorageCapacity = fixture.debugElement.query(By.css('#storageCapacity')).nativeElement;
    elStorageCapacity.value = 3.6;
    elStorageCapacity.dispatchEvent(new Event('input'));

    const elFeedinPower = fixture.debugElement.query(By.css('#feedinPower')).nativeElement;
    elFeedinPower.value = 5.2;
    elFeedinPower.dispatchEvent(new Event('input'));

    const elFeedoutPower = fixture.debugElement.query(By.css('#feedoutPower')).nativeElement;
    elFeedoutPower.value = 3.4;
    elFeedoutPower.dispatchEvent(new Event('input'));

    const elCycleEfficiency = fixture.debugElement.query(By.css('#cycleEfficiency')).nativeElement;
    elCycleEfficiency.value = 0.8;
    elCycleEfficiency.dispatchEvent(new Event('input'));

    const elInitialSOC = fixture.debugElement.query(By.css('#initialSOC')).nativeElement;
    elInitialSOC.value = 0.2;
    elInitialSOC.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(compStorageEditor.storeStorageTemplate).toHaveBeenCalled();
    });
  });

});
