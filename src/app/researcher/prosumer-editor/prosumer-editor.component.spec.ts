import { ProsumerEditorComponent } from './prosumer-editor.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadEditorComponent } from '../load-editor/load-editor.component';
import { StorageEditorComponent } from '../storage-editor/storage-editor.component';
import { CGEditorComponent } from '../cgeditor/cgeditor.component';
import { NCGEditorComponent } from '../ncgeditor/ncgeditor.component';
import { ProsumerDataEditorComponent } from '../prosumer-data-editor/prosumer-data-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('Component: ProsumerEditor', () => {
  let compProsumerEditor: ProsumerEditorComponent;
  let fixture: ComponentFixture<ProsumerEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProsumerEditorComponent,
        LoadEditorComponent,
        StorageEditorComponent,
        CGEditorComponent,
        NCGEditorComponent,
        ProsumerDataEditorComponent
      ],
      imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
      ]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(ProsumerEditorComponent);
    fixture.detectChanges();

    compProsumerEditor = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(compProsumerEditor).toBeTruthy();
  });

  it('adds prosumer after filling in form correctly', () => {
    spyOn(compProsumerEditor, 'addProsumer');

    const elProsumerID = fixture.debugElement.query(By.css('#prosumerId')).nativeElement;
    elProsumerID.value = 14;
    elProsumerID.dispatchEvent(new Event('input'));

    const elProsumerName = fixture.debugElement.query(By.css('#prosumerName')).nativeElement;
    elProsumerName.value = 'Blubb';
    elProsumerName.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const addProsumerButton = fixture.debugElement.query(By.css('#buttonAddProsumer'));
    addProsumerButton.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(compProsumerEditor.addProsumer).toHaveBeenCalled();
    });

  });

  // TODO untouched form??
  // TODO testing child components?

  describe('ChildComponent: LoadEditorComponent', () => {
    let fixtureLoadEditor: ComponentFixture<LoadEditorComponent>
    beforeEach(() => {
      fixtureLoadEditor = TestBed.createComponent(LoadEditorComponent);
      compProsumerEditor.loadEditor = fixtureLoadEditor.componentInstance;
      fixtureLoadEditor.detectChanges();
    });

    it('loadEditor should be created', () => {
      expect(compProsumerEditor.loadEditor).toBeTruthy();
    });

    it('clicking reset button should call reset function', async (() => {
      spyOn(compProsumerEditor.loadEditor, 'resetParameters');

      const button = fixtureLoadEditor.debugElement.query(By.css('#resetButton'));
      button.triggerEventHandler('click', {});
      fixtureLoadEditor.detectChanges();

      fixtureLoadEditor.whenStable().then(() => {
        expect(compProsumerEditor.loadEditor.resetParameters).toHaveBeenCalled();
      });
    }));

    it('after filling in the load form the store button should be clickable but not before?', () => {
      spyOn(compProsumerEditor.loadEditor, 'storeLoadTemplate');

      const inputModel = fixtureLoadEditor.debugElement.query(By.css('#model'));
      const elModel = inputModel.nativeElement;

      elModel.value = 'model123';
      elModel.dispatchEvent(new Event('input'));

      const inputLoadProfile = fixtureLoadEditor.debugElement.query(By.css('#loadProfile'));
      const elLoadProfile = inputLoadProfile.nativeElement;

      elLoadProfile.value = '0.1,1.2,2.3';
      elLoadProfile.dispatchEvent(new Event('input'));

      const inputRelativeControllability = fixtureLoadEditor.debugElement.query(By.css('#relativeControllability'));
      const elRelativeControllability = inputRelativeControllability.nativeElement;

      elRelativeControllability.value = 0.5;
      elRelativeControllability.dispatchEvent(new Event('input'));

      const inputTemporalShiftingCapability = fixtureLoadEditor.debugElement.query(By.css('#temporalShiftingCapability'));
      const elTemporalShiftingCapability = inputTemporalShiftingCapability.nativeElement;

      elTemporalShiftingCapability.value = 1;
      elTemporalShiftingCapability.dispatchEvent(new Event('input'));

      fixtureLoadEditor.detectChanges();
      const saveButton = fixtureLoadEditor.debugElement.query(By.css('#saveButton'));
      saveButton.triggerEventHandler('click', {});

      fixtureLoadEditor.whenStable().then(() => {
        expect(compProsumerEditor.loadEditor.storeLoadTemplate).toHaveBeenCalled();
      });
    });
  });

  describe('ChildComponent: StorageEditor', () => {
    let fixtureStorage: ComponentFixture<StorageEditorComponent>;
    beforeEach(() => {
      fixtureStorage = TestBed.createComponent(StorageEditorComponent);
      compProsumerEditor.storageEditor = fixtureStorage.componentInstance;
      fixtureStorage.detectChanges();
    });

    it('should be created', () => {
      expect(compProsumerEditor.storageEditor).toBeTruthy();
    });

    it('clicking reset button should call reset function', async (() => {
      spyOn(compProsumerEditor.storageEditor, 'resetParameters');

      const button = fixtureStorage.debugElement.query(By.css('#resetButton'));
      button.triggerEventHandler('click', {});
      fixtureStorage.detectChanges();

      fixtureStorage.whenStable().then(() => {
        expect(compProsumerEditor.storageEditor.resetParameters).toHaveBeenCalled();
      });
    }));

    it('after filling in the storage form correctly the save button is clickable', () => {
      spyOn(compProsumerEditor.storageEditor, 'storeStorageTemplate');

      const elModel = fixtureStorage.debugElement.query(By.css('#model')).nativeElement;
      elModel.value = 'model124';
      elModel.dispatchEvent(new Event('input'));

      const elStorageCapacity = fixtureStorage.debugElement.query(By.css('#storageCapacity')).nativeElement;
      elStorageCapacity.value = 3.6;
      elStorageCapacity.dispatchEvent(new Event('input'));

      const elFeedinPower = fixtureStorage.debugElement.query(By.css('#feedinPower')).nativeElement;
      elFeedinPower.value = 5.2;
      elFeedinPower.dispatchEvent(new Event('input'));

      const elFeedoutPower = fixtureStorage.debugElement.query(By.css('#feedoutPower')).nativeElement;
      elFeedoutPower.value = 3.4;
      elFeedoutPower.dispatchEvent(new Event('input'));

      const elCycleEfficiency = fixtureStorage.debugElement.query(By.css('#cycleEfficiency')).nativeElement;
      elCycleEfficiency.value = 0.8;
      elCycleEfficiency.dispatchEvent(new Event('input'));

      const elInitialSOC = fixtureStorage.debugElement.query(By.css('#initialSOC')).nativeElement;
      elInitialSOC.value = 0.2;
      elInitialSOC.dispatchEvent(new Event('input'));

      fixtureStorage  .detectChanges();
      const saveButton = fixtureStorage.debugElement.query(By.css('#saveButton'));
      saveButton.triggerEventHandler('click', {});

      fixtureStorage.whenStable().then(() => {
        expect(compProsumerEditor.storageEditor.storeStorageTemplate).toHaveBeenCalled();
      });
    });
  });

  describe('ChildComponent: CGEditor', () => {
    let fixtureCGEditor: ComponentFixture<CGEditorComponent>;
    beforeEach(() => {
      fixtureCGEditor = TestBed.createComponent(CGEditorComponent);
      compProsumerEditor.cgEditor = fixtureCGEditor.componentInstance;
      fixtureCGEditor.detectChanges();
    });

    it('should be created', () => {
      expect(compProsumerEditor.cgEditor).toBeTruthy();
    });

    it('should have clickable reset button', () => {
      spyOn(compProsumerEditor.cgEditor, 'resetParameters');

      const button = fixtureCGEditor.debugElement.query(By.css('#resetButton'));
      button.triggerEventHandler('click', {});
      fixtureCGEditor.detectChanges();

      fixtureCGEditor.whenStable().then(() => {
        expect(compProsumerEditor.cgEditor.resetParameters).toHaveBeenCalled();
      });
    });

    it('should have clickable store button after filling in form correctly', () => {
      spyOn(compProsumerEditor.cgEditor, 'storeCGTemplate');

      const inputModel = fixtureCGEditor.debugElement.query(By.css('#model'));
      const elModel = inputModel.nativeElement;

      elModel.value = 'model234';
      elModel.dispatchEvent(new Event('input'));

      const inputMaximalGeneration = fixtureCGEditor.debugElement.query(By.css('#maximalGeneration'));
      const elMaximalGeneration = inputMaximalGeneration.nativeElement;

      elMaximalGeneration.value = 2.4;
      elMaximalGeneration.dispatchEvent(new Event('input'));

      const inputMinimalDowntime = fixtureCGEditor.debugElement.query(By.css('#minimalDowntime'));
      const elMinimalDowntime = inputMinimalDowntime.nativeElement;

      elMinimalDowntime.value = 7.3;
      elMinimalDowntime.dispatchEvent(new Event('input'));

      const inputMinimalUptime = fixtureCGEditor.debugElement.query(By.css('#minimalUptime'));
      const elMinimumUptime = inputMinimalUptime.nativeElement;

      elMinimumUptime.value = 3.2;
      elMinimumUptime.dispatchEvent(new Event('input'));

      const inputRampingParameter = fixtureCGEditor.debugElement.query(By.css('#rampingParameter'));
      const elRampingParameter = inputRampingParameter.nativeElement;

      elRampingParameter.value = 0.5;
      elRampingParameter.dispatchEvent(new Event('input'));

      const inputHeatCouplingNumber = fixtureCGEditor.debugElement.query(By.css('#heatCouplingNumber'));
      const elHeatCouplingNumber = inputHeatCouplingNumber.nativeElement;

      elHeatCouplingNumber.value = 1.3;
      elHeatCouplingNumber.dispatchEvent(new Event('input'));

      fixtureCGEditor.detectChanges();
      const saveButton = fixtureCGEditor.debugElement.query(By.css('#saveButton'));
      saveButton.triggerEventHandler('click', {});

      fixtureCGEditor.whenStable().then(() => {
        expect(compProsumerEditor.cgEditor.storeCGTemplate).toHaveBeenCalled();
      });
    });

  });

  describe('ChildComponent: CGEditor', () => {
    let fixtureNCGEditor: ComponentFixture<NCGEditorComponent>;
    beforeEach(() => {
      fixtureNCGEditor = TestBed.createComponent(NCGEditorComponent);
      compProsumerEditor.ncgEditor = fixtureNCGEditor.componentInstance;
      fixtureNCGEditor.detectChanges();
    });

    it('should be created', () => {
      expect(compProsumerEditor.ncgEditor).toBeTruthy();
    });

    it('should have clickable reset button', () => {
      spyOn(compProsumerEditor.ncgEditor, 'resetParameters');

      const button = fixtureNCGEditor.debugElement.query(By.css('#resetButton'));
      button.triggerEventHandler('click', {});
      fixtureNCGEditor.detectChanges();

      fixtureNCGEditor.whenStable().then(() => {
        expect(compProsumerEditor.ncgEditor.resetParameters).toHaveBeenCalled();
      });
    });

    it('should have clickable store button after filling in form correctly', () => {
      spyOn(compProsumerEditor.ncgEditor, 'storeNCGTemplate');

      const inputModel = fixtureNCGEditor.debugElement.query(By.css('#model'));
      const elModel = inputModel.nativeElement;

      elModel.value = 'model234';
      elModel.dispatchEvent(new Event('input'));

      const inputProjectedGeneration = fixtureNCGEditor.debugElement.query(By.css('#projectedGeneration'));
      const elProjectedGeneration = inputProjectedGeneration.nativeElement;

      elProjectedGeneration.value = '2.3,3.4,4.5,5.6';
      elProjectedGeneration.dispatchEvent(new Event('input'));

      const inputPeakPower = fixtureNCGEditor.debugElement.query(By.css('#peakPower'));
      const elPeakPower = inputPeakPower.nativeElement;

      elPeakPower.value = 7.3;
      elPeakPower.dispatchEvent(new Event('input'));

      fixtureNCGEditor.detectChanges();
      const saveButton = fixtureNCGEditor.debugElement.query(By.css('#saveButton'));
      saveButton.triggerEventHandler('click', {});

      fixtureNCGEditor.whenStable().then(() => {
        expect(compProsumerEditor.ncgEditor.storeNCGTemplate).toHaveBeenCalled();
      });
    });

  });

  describe('ChildComponent: ProsumerDataEditor', () => {
    let fixtureProsumerDataEditor: ComponentFixture<ProsumerDataEditorComponent>;
    beforeEach(() => {
      fixtureProsumerDataEditor = TestBed.createComponent(ProsumerDataEditorComponent);
      compProsumerEditor.pdEditor = fixtureProsumerDataEditor.componentInstance;
      fixtureProsumerDataEditor.detectChanges();
    });

    it('should be created', () => {
      expect(compProsumerEditor).toBeTruthy();
    });
  });
  // TODO what about the provided service???
});
