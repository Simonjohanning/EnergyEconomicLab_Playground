import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentEditorComponent } from './experiment-editor.component';

describe('ExperimentEditorComponent', () => {
  let component: ExperimentEditorComponent;
  let fixture: ComponentFixture<ExperimentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
