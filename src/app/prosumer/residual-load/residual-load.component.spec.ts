import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidualLoadComponent } from './residual-load.component';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {Load} from '../../core/data-types/Load';

describe('ResidualLoadComponent', () => {
  let component: ResidualLoadComponent;
  let fixture: ComponentFixture<ResidualLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidualLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidualLoadComponent);
    component = fixture.componentInstance;
    const load = new Load('testmodel', [.3, .4, .5, .7], .4, .2);
    const prosInst = new ProsumerInstance([],[],[load],[], {x: 3, y: 4}, 100);
    component.prosumerInstance = prosInst;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
