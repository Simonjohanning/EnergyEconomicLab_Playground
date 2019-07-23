import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerEditorComponent } from './prosumer-editor.component';

describe('ProsumerEditorComponent', () => {
  let component: ProsumerEditorComponent;
  let fixture: ComponentFixture<ProsumerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsumerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsumerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
