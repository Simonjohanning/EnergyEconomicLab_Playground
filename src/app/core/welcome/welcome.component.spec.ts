import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExperimentInstanceLoaderService } from '../experiment-instance-loader.service';
import { DataProvisionService } from '../data-provision.service';
import { ExperimentStateService } from '../experiment-state.service';

class MockExperimentInstanceLoaderService extends ExperimentInstanceLoaderService {}

class MockDataProvisionService extends DataProvisionService {}

class MockExperimentStateService extends ExperimentStateService {}

describe('Component: WelcomeComponent', () => {
  let welcomeComponent: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let testBedExperimentInstanceLoaderService: ExperimentInstanceLoaderService;
  let welcomeComponentExperimentInstanceLoaderService: ExperimentInstanceLoaderService;
  let testBedDataProvisionService: DataProvisionService;
  let welcomeComponentDataProvisionService: DataProvisionService;
  let testBedExperimentStateService: ExperimentStateService;
  let welcomeComponentExperimentStateService: ExperimentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [
        ExperimentInstanceLoaderService,
        DataProvisionService,
        ExperimentStateService
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule
      ]
    });

    // Configure the component with another set of Providers
    TestBed.overrideComponent(
      WelcomeComponent,
      {set: {providers: [
            {provide: ExperimentInstanceLoaderService, useClass: MockExperimentInstanceLoaderService},
            {provide: DataProvisionService, useClass: MockDataProvisionService},
            {provide: ExperimentStateService, useClass: MockExperimentStateService}
          ]}});

    // create component and test fixture
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.detectChanges();
    welcomeComponent = fixture.componentInstance;

    // ExperimentInstanceLoaderService provided to the TestBed
    testBedExperimentInstanceLoaderService = TestBed.get(ExperimentInstanceLoaderService);

    // ExperimentInstanceLoaderService provided by the WelcomeComponent (should return MockExperimentInstanceLoaderService)
    welcomeComponentExperimentInstanceLoaderService = fixture.debugElement.injector.get(ExperimentInstanceLoaderService);

    // DataProvisionService provided to the TestBed
    testBedDataProvisionService = TestBed.get(DataProvisionService);

    // DataProvisionService provided by the WelcomeComponent (should return MockDataProvisionService)
    welcomeComponentDataProvisionService = fixture.debugElement.injector.get(DataProvisionService);

    // ExperimentStateService provided to the TestBed
    testBedExperimentStateService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the WelcomeComponent (should return MockExperimentStateService)
    welcomeComponentExperimentStateService = fixture.debugElement.injector.get(ExperimentStateService);
  });

  it('should create', () => {
    expect(welcomeComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance for ExperimentInstanceLoaderService',
    inject([ExperimentInstanceLoaderService], (injectService: ExperimentInstanceLoaderService) => {
      expect(injectService).toBe(testBedExperimentInstanceLoaderService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentInstanceLoaderService', () => {
    expect(welcomeComponentExperimentInstanceLoaderService instanceof MockExperimentInstanceLoaderService).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance for DataProvisionService',
    inject([DataProvisionService], (injectService: DataProvisionService) => {
      expect(injectService).toBe(testBedDataProvisionService);
    })
  );

  it('Service injected via component should be an instance of MockDataProvisionService', () => {
    expect(welcomeComponentDataProvisionService instanceof MockDataProvisionService).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance for ExperimentStateService',
    inject([ExperimentStateService], (injectService: ExperimentStateService) => {
      expect(injectService).toBe(testBedExperimentStateService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentStateService', () => {
    expect(welcomeComponentExperimentStateService instanceof MockExperimentStateService).toBeTruthy();
  });

  describe('test all injected Services', () => {

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([ExperimentInstanceLoaderService], (injectService: ExperimentInstanceLoaderService) => {
        expect(injectService).toBe(testBedExperimentInstanceLoaderService);
    }));

    it('Service injected via component should be an instance of MockExperimentInstanceLoader', () => {
      expect(welcomeComponentExperimentInstanceLoaderService instanceof MockExperimentInstanceLoaderService).toBeTruthy();
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([DataProvisionService], (injectService: DataProvisionService) => {
        expect(injectService).toBe(testBedDataProvisionService);
      }));

    it('Service injected via component should be an instance of MockDataProvisionService', () => {
      expect(welcomeComponentDataProvisionService instanceof MockDataProvisionService).toBeTruthy();
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([ExperimentStateService], (injectService: ExperimentStateService) => {
       expect(injectService).toBe(testBedExperimentStateService);
      }));

    it('Service injected via component should be an instance of MockExperimentStateService', () => {
      expect(welcomeComponentExperimentStateService instanceof MockExperimentStateService).toBeTruthy();
    });
  });


  describe('all buttons should be on there', () => {

    it('should contain normal login button', fakeAsync(() => {
      tick();
      const compiled = fixture.debugElement.nativeElement;
      tick();
      expect(compiled.querySelector('#ParticipationButton').textContent).toContain('Participate');
    }));

    it('should contain prosumer login button', fakeAsync(() => {
      tick();
      const compiled = fixture.debugElement.nativeElement;
      tick();
      expect(compiled.querySelector('#ProsumerLoginButton').textContent).toContain('Login 10_Prosumer_12');
    }));

    it('should contain experiment designer login button', fakeAsync(() => {
      tick();
      const compiled = fixture.debugElement.nativeElement;
      tick();
      expect(compiled.querySelector('#ExperimentDesignerLoginButton').textContent).toContain('Login 10_ExperimentDesigner');
    }));

    it('should contain rdf button', fakeAsync(() => {
      tick();
      const compiled = fixture.debugElement.nativeElement;
      tick();
      expect(compiled.querySelector('.rdfButton').textContent).toContain('printRDF');
    }));

  });

  // TODO testing the clicks?

  // TODO test all routes? (not all routes might be defined yet)
});
