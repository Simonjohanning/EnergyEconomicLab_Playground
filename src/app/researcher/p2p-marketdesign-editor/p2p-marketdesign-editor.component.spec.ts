import { P2pMarketdesignEditorComponent } from './p2p-marketdesign-editor.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Component: P2PMarketDesignEditor', () => {
  let compP2PMarketdesignEditor: P2pMarketdesignEditorComponent;
  let fixture: ComponentFixture<P2pMarketdesignEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pMarketdesignEditorComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ]
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(P2pMarketdesignEditorComponent);
    fixture.detectChanges();

    compP2PMarketdesignEditor = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(compP2PMarketdesignEditor).toBeTruthy();
  });

});
