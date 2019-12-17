import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageEditorComponent } from './storage-editor.component';

describe('StorageEditorComponent', () => {
  let component: StorageEditorComponent;
  let fixture: ComponentFixture<StorageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
