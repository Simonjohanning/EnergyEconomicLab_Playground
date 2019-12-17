import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperimentDescriptionEditorComponent} from './experiment-description-editor/experiment-description-editor.component';
import { ExperimentInstanceEditorComponent } from './experiment-instance-editor/experiment-instance-editor.component';
import { ResearcherComponent } from './researcher.component';

describe('ResearcherComponent', () => {
  let component: ResearcherComponent;
  let fixture: ComponentFixture<ResearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResearcherComponent,
        ExperimentInstanceEditorComponent,
        ExperimentInstanceEditorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Researcher time management works', () => {
    xit('Researcher can progress time', () => {

    });

    xit('Experiment time is displayed accordingly', () => {

    });
  });

  xdescribe('Experiment information is displayed correctly', () => {
    xit('Experiment ID is displayed correctly', () => {

    });
  });
});
