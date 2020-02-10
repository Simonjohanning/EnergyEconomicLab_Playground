import { CGEditorComponent } from './cgeditor.component';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { MockEDMService } from '../../core/mock-edm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {By} from '@angular/platform-browser';

class MockedMockEDMService extends MockEDMService {}

describe('Comp: CGEditor', () => {

  let cgEditorComponent: CGEditorComponent;
  let fixture: ComponentFixture<CGEditorComponent>;
  let testBedService: MockEDMService;
  let cgEditorService: MockEDMService;

  beforeEach(() => {
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
    fixture.detectChanges();

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

  it('clicking reset button should call reset function', async(() => {
    spyOn(cgEditorComponent, 'resetParameters');
    const button = fixture.debugElement.query(By.css('#resetButton'));
    button.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {
      expect(cgEditorComponent.resetParameters).toHaveBeenCalled();
    });
  }));

  it('after filling in the form the store button should be clickable but not before?', () => {
    spyOn(cgEditorComponent, 'storeCGTemplate');

    const inputModel = fixture.debugElement.query(By.css('#model'));
    const elModel = inputModel.nativeElement;

    elModel.value = 'model234';
    elModel.dispatchEvent(new Event('input'));

    const inputMaximalGeneration = fixture.debugElement.query(By.css('#maximalGeneration'));
    const elMaximalGeneration = inputMaximalGeneration.nativeElement;

    elMaximalGeneration.value = 2.4;
    elMaximalGeneration.dispatchEvent(new Event('input'));

    const inputMinimalDowntime = fixture.debugElement.query(By.css('#minimalDowntime'));
    const elMinimalDowntime = inputMinimalDowntime.nativeElement;

    elMinimalDowntime.value = 7.3;
    elMinimalDowntime.dispatchEvent(new Event('input'));

    const inputMinimalUptime = fixture.debugElement.query(By.css('#minimalUptime'));
    const elMinimumUptime = inputMinimalUptime.nativeElement;

    elMinimumUptime.value = 3.2;
    elMinimumUptime.dispatchEvent(new Event('input'));

    const inputRampingParameter = fixture.debugElement.query(By.css('#rampingParameter'));
    const elRampingParameter = inputRampingParameter.nativeElement;

    elRampingParameter.value = 0.5;
    elRampingParameter.dispatchEvent(new Event('input'));

    const inputHeatCouplingNumber = fixture.debugElement.query(By.css('#heatCouplingNumber'));
    const elHeatCouplingNumber = inputHeatCouplingNumber.nativeElement;

    elHeatCouplingNumber.value = 1.3;
    elHeatCouplingNumber.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(cgEditorComponent.storeCGTemplate).toHaveBeenCalled();
    });

  });
});
