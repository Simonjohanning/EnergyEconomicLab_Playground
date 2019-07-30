import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentDescriptionEditorComponent } from './experiment-description-editor.component';

describe('ExperimentDescriptionEditorComponent', () => {
  let component: ExperimentDescriptionEditorComponent;
  let fixture: ComponentFixture<ExperimentDescriptionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentDescriptionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentDescriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
