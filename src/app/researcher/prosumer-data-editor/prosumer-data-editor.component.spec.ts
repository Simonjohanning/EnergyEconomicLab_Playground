import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProsumerDataEditorComponent } from './prosumer-data-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

describe('Component: ProsumerDataEditor', () => {

  let prosumerDataEditorComponent: ProsumerDataEditorComponent;
  let fixture: ComponentFixture<ProsumerDataEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProsumerDataEditorComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
      ]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(ProsumerDataEditorComponent);

    prosumerDataEditorComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(prosumerDataEditorComponent).toBeTruthy();
  });

});
