import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CGEditorComponent } from './cgeditor.component';

describe('CGEditorComponent', () => {
  let component: CGEditorComponent;
  let fixture: ComponentFixture<CGEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CGEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CGEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
