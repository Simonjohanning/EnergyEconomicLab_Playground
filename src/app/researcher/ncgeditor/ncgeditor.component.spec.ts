import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NCGEditorComponent } from './ncgeditor.component';

describe('NCGEditorComponent', () => {
  let component: NCGEditorComponent;
  let fixture: ComponentFixture<NCGEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NCGEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NCGEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
