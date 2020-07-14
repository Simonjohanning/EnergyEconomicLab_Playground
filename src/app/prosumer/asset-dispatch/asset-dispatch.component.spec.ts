import { AssetDispatchComponent } from './asset-dispatch.component';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { TimeService } from '../../core/time.service';
import { CGDispatchComponent } from '../cgdispatch/cgdispatch.component';
import { StorageDispatchComponent } from '../storage-dispatch/storage-dispatch.component';
import { LoadDispatchComponent } from '../load-dispatch/load-dispatch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataProvisionService } from '../../core/data-provision.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-wrapper',
  template: '<app-asset-dispatch [prosumerInstance]="prosumerInstance"></app-asset-dispatch>'
})
// tslint:disable-next-line:component-class-suffix
class Wrapper {
  dataProvisionService = new DataProvisionService();
  prosumerInstance = of(this.dataProvisionService.getMockProsumerInstance());
}

describe('AssetDispatch Component', () => {
  let component: AssetDispatchComponent;
  let fixture: ComponentFixture<Wrapper>;
  let timeService: TimeService;
  let testBedTimeService: TimeService;

  /*
  As the asset dispatch component needs a prosumer instance as input at time of creation, a wrapper class is needed which provides
  the prosumer instance and then creates the respective asset dispatch app
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AssetDispatchComponent,
        CGDispatchComponent,
        StorageDispatchComponent,
        LoadDispatchComponent,
        Wrapper
      ],
      providers: [ TimeService ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Wrapper);
    fixture.detectChanges();
    component = fixture.debugElement.children[0].componentInstance;

    testBedTimeService = TestBed.get(TimeService);
    timeService = fixture.debugElement.injector.get(TimeService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TimeService injected via inject(...) and TestBed.get(...) should be of same instance as TimeService', () => {
    inject([TimeService], (injectService: TimeService) => {
      expect(injectService).toBe(testBedTimeService);
    });
  });

  describe('clicking on an asset selects it and makes print schedule button visible', () => {
    it('clicking on storage selects the storage and clicking on schedule button results function call', () => {
      const spy = spyOn(component, 'printSchedule');
      const elStorage = fixture.debugElement.query(By.css('#storage'));
      expect(elStorage).toBeTruthy();

      elStorage.triggerEventHandler('click', {}); // selects the storage
      fixture.detectChanges();

      const scheduleButton = fixture.debugElement.query(By.css('#storageButton'));
      expect(scheduleButton).toBeTruthy();

      scheduleButton.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });

  it('clicking on controllable generator selects the controllable generator and clicking on schedule button results function call', () => {
    const spy = spyOn(component, 'printSchedule');
    const elControllableGenerator = fixture.debugElement.query(By.css('#controllableGenerator'));
    expect(elControllableGenerator).toBeTruthy();

    elControllableGenerator.triggerEventHandler('click', {}); // selects the storage
    fixture.detectChanges();

    const scheduleButton = fixture.debugElement.query(By.css('#controllableGeneratorButton'));
    expect(scheduleButton).toBeTruthy();

    scheduleButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('clicking on load selects the load and clicking on schedule button results function call', () => {
    const spy = spyOn(component, 'printSchedule');
    const elLoad = fixture.debugElement.query(By.css('#load'));
    expect(elLoad).toBeTruthy();

    elLoad.triggerEventHandler('click', {}); // selects the storage
    fixture.detectChanges();

    const scheduleButton = fixture.debugElement.query(By.css('#loadButton'));
    expect(scheduleButton).toBeTruthy();

    scheduleButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
