import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2PBidEditorComponent } from './p2p-bid-editor.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('P2PBidEditorComponent', () => {
  let component: P2PBidEditorComponent;
  let fixture: ComponentFixture<P2PBidEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ P2PBidEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2PBidEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
