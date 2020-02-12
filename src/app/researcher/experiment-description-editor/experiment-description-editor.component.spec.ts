import { MockEDMService } from '../../core/mock-edm.service';
import { ExperimentDescriptionEditorComponent } from './experiment-description-editor.component';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProsumerEditorComponent } from '../prosumer-editor/prosumer-editor.component';
import { P2pMarketdesignEditorComponent } from '../p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import { LoadEditorComponent } from '../load-editor/load-editor.component';
import { StorageEditorComponent } from '../storage-editor/storage-editor.component';
import { CGEditorComponent } from '../cgeditor/cgeditor.component';
import { NCGEditorComponent } from '../ncgeditor/ncgeditor.component';
import { ProsumerDataEditorComponent } from '../prosumer-data-editor/prosumer-data-editor.component';
import { By } from '@angular/platform-browser';

class MockedMockEDMService extends MockEDMService {}

describe('Component: ExperimentDescriptionEditor', () => {
  let compExperimentDescriptionEditor: ExperimentDescriptionEditorComponent;
  let fixture: ComponentFixture<ExperimentDescriptionEditorComponent>;
  let testBedService: MockEDMService;
  let compService: MockEDMService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperimentDescriptionEditorComponent,
        ProsumerEditorComponent,
        P2pMarketdesignEditorComponent,
        LoadEditorComponent,
        StorageEditorComponent,
        CGEditorComponent,
        NCGEditorComponent,
        ProsumerDataEditorComponent
      ],
      providers: [MockEDMService],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ]
    });
    TestBed.overrideComponent(
      ExperimentDescriptionEditorComponent,
      {set: {providers: [{provide: MockEDMService, useClass: MockedMockEDMService}]}}
    );
    TestBed.compileComponents();

    fixture = TestBed.createComponent(ExperimentDescriptionEditorComponent);
    fixture.detectChanges();

    compExperimentDescriptionEditor = fixture.componentInstance;

    testBedService = TestBed.get(MockEDMService);

    compService = fixture.debugElement.injector.get(MockEDMService);
  });

  it('should be created', () => {
    expect(compExperimentDescriptionEditor).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([MockEDMService], (injectService: MockEDMService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockedMockEDMService', () => {
    expect(compService instanceof MockedMockEDMService).toBeTruthy();
  });

  // *ngIf="(prosumerEditor.prosumerList.length > 0) && (p2pmdEditor.formValid()) && descriptionForm.valid" (click)="submitExperimentDesign()
  // descriptionForm.valid, when there is a non-emtpy string
  it('after entering valid description and valid form p2p market design and there is at least one prosumer, the experiment can be submitted', () => {
    spyOn(compExperimentDescriptionEditor, 'submitExperimentDesign');

    const elDescription = fixture.debugElement.query(By.css('#description')).nativeElement;
    elDescription.value = 'some weird experiment description';
    elDescription.dispatchEvent(new Event('input'));

    // in the beginning there always is one prosumer
    expect(TestBed.createComponent(ProsumerEditorComponent).componentInstance.prosumerList.length > 0);

    const elBidClosure = fixture.debugElement.query(By.css('#bidClosure')).nativeElement;
    elBidClosure.value = 1;
    elBidClosure.dispatchEvent(new Event('input'));

    const elTimeSliceLength = fixture.debugElement.query(By.css('#timeSliceLength')).nativeElement;
    elTimeSliceLength.value = 0.3;
    elTimeSliceLength.dispatchEvent(new Event('input'));

    const elMinBidSize = fixture.debugElement.query(By.css('#minBidSize')).nativeElement;
    elMinBidSize.value = 14;
    elMinBidSize.dispatchEvent(new Event('input'));

    const elMaxPrice = fixture.debugElement.query(By.css('#maxPrice')).nativeElement;
    elMaxPrice.value = 3;
    elMaxPrice.dispatchEvent(new Event('input'));

    const elFeeAmount = fixture.debugElement.query(By.css('#feeAmount')).nativeElement;
    elFeeAmount.value = 0.2;
    elFeeAmount.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const buttonSubmit = fixture.debugElement.query(By.css('#submitButton'));
    buttonSubmit.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(compExperimentDescriptionEditor.submitExperimentDesign).toHaveBeenCalled();
    });
  });

  it('after entering invalid description the experiment cannot be submitted', () => {
    const elDescription = fixture.debugElement.query(By.css('#description')).nativeElement;
    elDescription.value = 1;
    elDescription.dispatchEvent(new Event('input'));

    // in the beginning there always is one prosumer
    expect(TestBed.createComponent(ProsumerEditorComponent).componentInstance.prosumerList.length > 0);

    const elBidClosure = fixture.debugElement.query(By.css('#bidClosure')).nativeElement;
    elBidClosure.value = 1;
    elBidClosure.dispatchEvent(new Event('input'));

    const elTimeSliceLength = fixture.debugElement.query(By.css('#timeSliceLength')).nativeElement;
    elTimeSliceLength.value = 0.3;
    elTimeSliceLength.dispatchEvent(new Event('input'));

    const elMinBidSize = fixture.debugElement.query(By.css('#minBidSize')).nativeElement;
    elMinBidSize.value = 14;
    elMinBidSize.dispatchEvent(new Event('input'));

    const elMaxPrice = fixture.debugElement.query(By.css('#maxPrice')).nativeElement;
    elMaxPrice.value = 3;
    elMaxPrice.dispatchEvent(new Event('input'));

    const elFeeAmount = fixture.debugElement.query(By.css('#feeAmount')).nativeElement;
    elFeeAmount.value = 0.2;
    elFeeAmount.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('#submitButton')) === null);
    });
  });

  it('after removing all prosumers the experiment cannot be submitted', () => {

    const elDescription = fixture.debugElement.query(By.css('#description')).nativeElement;
    elDescription.value = 'description';
    elDescription.dispatchEvent(new Event('input'));

    // in the beginning there always is one prosumer
    const prosumer1 = {
      name: 'defProsumer',
      id: 12
    };
    TestBed.createComponent(ProsumerEditorComponent).componentInstance.removeProsumer(prosumer1);

    const elBidClosure = fixture.debugElement.query(By.css('#bidClosure')).nativeElement;
    elBidClosure.value = 1;
    elBidClosure.dispatchEvent(new Event('input'));

    const elTimeSliceLength = fixture.debugElement.query(By.css('#timeSliceLength')).nativeElement;
    elTimeSliceLength.value = 0.3;
    elTimeSliceLength.dispatchEvent(new Event('input'));

    const elMinBidSize = fixture.debugElement.query(By.css('#minBidSize')).nativeElement;
    elMinBidSize.value = 14;
    elMinBidSize.dispatchEvent(new Event('input'));

    const elMaxPrice = fixture.debugElement.query(By.css('#maxPrice')).nativeElement;
    elMaxPrice.value = 3;
    elMaxPrice.dispatchEvent(new Event('input'));

    const elFeeAmount = fixture.debugElement.query(By.css('#feeAmount')).nativeElement;
    elFeeAmount.value = 0.2;
    elFeeAmount.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('#submitButton')) === null);
    });
  });

  it('after entering invalid input for P2P market Design the experiment cannot be submitted', () => {
    const elDescription = fixture.debugElement.query(By.css('#description')).nativeElement;
    elDescription.value = 'description';
    elDescription.dispatchEvent(new Event('input'));

    // in the beginning there always is one prosumer
    expect(TestBed.createComponent(ProsumerEditorComponent).componentInstance.prosumerList.length > 0);

    const elBidClosure = fixture.debugElement.query(By.css('#bidClosure')).nativeElement;
    elBidClosure.value = 1;
    elBidClosure.dispatchEvent(new Event('input'));

    const elTimeSliceLength = fixture.debugElement.query(By.css('#timeSliceLength')).nativeElement;
    elTimeSliceLength.value = 0.3;
    elTimeSliceLength.dispatchEvent(new Event('input'));

    const elMinBidSize = fixture.debugElement.query(By.css('#minBidSize')).nativeElement;
    elMinBidSize.value = 'blubb';
    elMinBidSize.dispatchEvent(new Event('input'));

    const elMaxPrice = fixture.debugElement.query(By.css('#maxPrice')).nativeElement;
    elMaxPrice.value = 3;
    elMaxPrice.dispatchEvent(new Event('input'));

    const elFeeAmount = fixture.debugElement.query(By.css('#feeAmount')).nativeElement;
    elFeeAmount.value = 0.2;
    elFeeAmount.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('#submitButton')) === null);
    });
  });


});
