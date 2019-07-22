import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPRDComponent } from './load-prd.component';
import {Load} from '../../core/data-types/Load';

describe('LoadPRDComponent', () => {
  let component: LoadPRDComponent;
  let fixture: ComponentFixture<LoadPRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPRDComponent);
    component = fixture.componentInstance;
    const load = new Load('testmodel', [.3, .4, .5, .7], .4, .2);
    component.resource = load;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Load Resource is displayed correctly', () => {
    xit(' Temp. Shifting cap is displayed', () => {

    });

    xit(' Rel. Controllability is displayed', () => {

    });

  });

  xdescribe('Toggle element / resource display hiding works', () => {

  });

  xdescribe('Chart is displayed properly', () => {

  });

});
