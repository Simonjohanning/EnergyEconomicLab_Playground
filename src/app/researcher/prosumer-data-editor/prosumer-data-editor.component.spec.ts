import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDataEditorComponent } from './prosumer-data-editor.component';

describe('ProsumerDataEditorComponent', () => {
  let component: ProsumerDataEditorComponent;
  let fixture: ComponentFixture<ProsumerDataEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsumerDataEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsumerDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
