import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pBidEditorComponent } from './p2-pbid-editor.component';

describe('P2PBidEditorComponent', () => {
  let component: P2pBidEditorComponent;
  let fixture: ComponentFixture<P2pBidEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2pBidEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pBidEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
