import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ResearcherComponent } from './researcher.component';
import { ExperimentStateService } from '../core/experiment-state.service';
import { ExperimentInstanceEditorComponent } from './experiment-instance-editor/experiment-instance-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperimentDescriptionEditorComponent } from './experiment-description-editor/experiment-description-editor.component';
import { ProsumerEditorComponent } from './prosumer-editor/prosumer-editor.component';
import {P2pMarketdesignEditorComponent} from './p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import {LoadEditorComponent} from './load-editor/load-editor.component';
import {StorageEditorComponent} from './storage-editor/storage-editor.component';
import {CGEditorComponent} from './cgeditor/cgeditor.component';
import {NCGEditorComponent} from './ncgeditor/ncgeditor.component';
import {ProsumerDataEditorComponent} from './prosumer-data-editor/prosumer-data-editor.component';

class MockExperimentStateService extends ExperimentStateService {
  experimentID = 123456;
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
      imports: [FormsModule, ReactiveFormsModule]
    });
    TestBed.overrideComponent(
      ResearcherComponent,
      {set: {providers: [{provide: ExperimentStateService, useClass: MockExperimentStateService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(ResearcherComponent);

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

  // TODO are all DOM elements of both available? --> if not, in the beginning there should be none, in the end only the respective one (also after clicking around)
});
