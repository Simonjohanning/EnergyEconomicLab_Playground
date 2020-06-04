import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ResearcherComponent } from './researcher.component';
import { ExperimentStateService } from '../core/experiment-state.service';
import { ExperimentInstanceEditorComponent } from './experiment-instance-editor/experiment-instance-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperimentDescriptionEditorComponent } from './experiment-description-editor/experiment-description-editor.component';
import { ProsumerEditorComponent } from './prosumer-editor/prosumer-editor.component';
import { P2pMarketdesignEditorComponent } from './p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import { LoadEditorComponent } from './load-editor/load-editor.component';
import { StorageEditorComponent } from './storage-editor/storage-editor.component';
import { CGEditorComponent } from './cgeditor/cgeditor.component';
import { NCGEditorComponent } from './ncgeditor/ncgeditor.component';
import { ProsumerDataEditorComponent } from './prosumer-data-editor/prosumer-data-editor.component';
import { By } from '@angular/platform-browser';

class MockExperimentStateService extends ExperimentStateService {
  public experimentID = 123456;
}

describe('Comp: Researcher', () => {

  let researcherComponent: ResearcherComponent;
  let fixture: ComponentFixture<ResearcherComponent>;
  let testBedService: ExperimentStateService;
  let researcherService: ExperimentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResearcherComponent,
        ExperimentInstanceEditorComponent,
        ExperimentDescriptionEditorComponent,
        ProsumerEditorComponent,
        P2pMarketdesignEditorComponent,
        LoadEditorComponent,
        StorageEditorComponent,
        CGEditorComponent,
        NCGEditorComponent,
        ProsumerDataEditorComponent
      ],
      providers: [ExperimentStateService],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
    TestBed.overrideComponent(
      ResearcherComponent,
      {set: {providers: [{provide: ExperimentStateService, useClass: MockExperimentStateService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(ResearcherComponent);
    fixture.detectChanges();

    // get test component from the fixture
    researcherComponent = fixture.componentInstance;

    // ExperimentStateService provided to the TestBed
    testBedService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the ResearcherComponent (should return MockExperimentStateService)
    researcherService = fixture.debugElement.injector.get(ExperimentStateService);
  });

  it('ResearcherComponent exists', () => {
    expect(researcherComponent).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ExperimentStateService], (injectService: ExperimentStateService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockExperimentStateService', () => {
    expect(researcherService instanceof MockExperimentStateService).toBeTruthy();
  });

  it('displays the experiment ID correctly', () => {
    const eID = 'Researcher View for experiment # ' + researcherService.experimentID;
    const description = fixture.debugElement.query(By.css('p'));
    expect(description.nativeElement.textContent.trim()).toBe(eID);
  });

  it('clicking on Design Editor sets the editor to show to "DesignEditor" ', fakeAsync(() => {
    spyOn(researcherComponent, 'toggle');
    const el = fixture.debugElement.query(By.css('#designEditor'));
    expect(el).toBeTruthy();
    el.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(researcherComponent.toggle).toHaveBeenCalled();
    });
  }));

  it('clicking on Instance Editor sets the editor to show to "InstanceEditor" ', () => {
    spyOn(researcherComponent, 'toggle');
    const el = fixture.debugElement.query(By.css('#instanceEditor'));
    expect(el).toBeTruthy();
    el.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(researcherComponent.toggle).toHaveBeenCalled();
    });
  });
});
