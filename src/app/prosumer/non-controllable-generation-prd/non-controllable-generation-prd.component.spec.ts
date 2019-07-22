import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonControllableGenerationPRDComponent } from './non-controllable-generation-prd.component';
import {NonControllableGenerator} from '../../core/data-types/NonControllableGenerator';

describe('NonControllableGenerationPRDComponent', () => {
  let component: NonControllableGenerationPRDComponent;
  let fixture: ComponentFixture<NonControllableGenerationPRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonControllableGenerationPRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonControllableGenerationPRDComponent);
    component = fixture.componentInstance;
    const ncGen = new NonControllableGenerator('tester', 4.3, [.3, .2, .4, .5]);
    component.resource = ncGen;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Non-controllable generation Resource is displayed correctly', () => {
    xit(' Peak Power is displayed', () => {

    });

    xit('Projected Generation is displayed', () => {

    });

  });

  xdescribe('Toggle element / resource display hiding works', () => {

  });

  xdescribe('Chart is displayed properly', () => {

  });
});
