import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pMarketdesignEditorComponent } from './p2p-marketdesign-editor.component';

describe('P2pMarketdesignEditorComponent', () => {
  let component: P2pMarketdesignEditorComponent;
  let fixture: ComponentFixture<P2pMarketdesignEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2pMarketdesignEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pMarketdesignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
