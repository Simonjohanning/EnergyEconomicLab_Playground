import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '../../src/app/app.component';
import {By} from '@angular/platform-browser';
import {TimeComponent} from '../../src/app/core/time/time.component';
import {ExperimentStateService} from '../../src/app/core/experiment-state.service';
import {MockEDMService} from '../../src/app/core/mock-edm.service';
import {TimeService} from '../../src/app/core/time.service';

describe('workspace-project App', () => {
  let page: AppPage;
  let appComp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    page = new AppPage();
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComp = fixture.componentInstance;
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to labPlayground!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });

  it('should create the app', () => {
    expect(appComp).toBeTruthy();
  });
  it('title should be shown', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h1')).toEqual(appComp.title);
  });

// TODO research component are all DOM elements of both available? --> if not, in the beginning there should be none, in the end only the respective one (also after clicking around)
});

