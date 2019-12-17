import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentInstanceEditorComponent } from './experiment-instance-editor.component';

describe('ExperimentInstanceEditorComponent', () => {
  let component: ExperimentInstanceEditorComponent;
  let fixture: ComponentFixture<ExperimentInstanceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentInstanceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentInstanceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
