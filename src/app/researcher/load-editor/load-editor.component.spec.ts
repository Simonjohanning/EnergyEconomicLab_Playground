import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEditorComponent } from './load-editor.component';

describe('LoadEditorComponent', () => {
  let component: LoadEditorComponent;
  let fixture: ComponentFixture<LoadEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
