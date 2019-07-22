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

  xdescribe('Form validation works', () => {
    xit('Valid bid is accepted', () => {

    });

    xit('Start invalid bid is rejected', () => {

    });

    xit('Duration invalid bid is rejected', () => {

    });

    xit('Power invalid bid is rejected', () => {

    });

    xit('Price invalid bid is rejected', () => {

    });

  });

  xdescribe('Error messages shown correctly', () => {
    xit('Valid bid creates no shown error msg', () => {

    });

    xit('Start invalid bid gives respective error message', () => {

    });

    xit('Duration invalid bid gives respective error message', () => {

    });

    xit('Power invalid bid gives respective error message', () => {

    });

    xit('Price invalid bid gives respective error message', () => {

    });

  });

  xdescribe('Valid bid submission works', () => {

  });
});

