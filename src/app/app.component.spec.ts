import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TimeService } from './core/time.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeComponent } from './core/time/time.component';

class MockTimeService extends TimeService {

}

describe('Component: App', () => {

  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let testBedService: TimeService;
  let appComponentService: TimeService;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [AppComponent, TimeComponent],
      imports: [RouterTestingModule],
      providers: [TimeService]
    });
    // Configure the component with another set of Providers
    TestBed.overrideComponent(
      AppComponent,
      {set: {providers: [{provide: TimeService, useClass: MockTimeService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    appComponent = fixture.componentInstance;

    // TimeService provided to the TestBed
    testBedService = TestBed.get(TimeService);

    // TimeService provided by the AppComponent (should return MockTimeService)
    appComponentService = fixture.debugElement.injector.get(TimeService);
  });

  it('AppComponent exists', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have "labPlayground" as title', () => {
    expect(appComponent.title).toEqual('labPlayground');
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([TimeService], (injectService: TimeService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentStateService', () => {
    expect(appComponentService instanceof MockTimeService).toBeTruthy();
  });

  it('should have proceed time Button', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.debugElement.nativeElement;
    tick();
    expect(compiled.querySelector('button').textContent).toContain('Proceed');
  }));

  // TODO check whether you can actually click it? HOW?

});
