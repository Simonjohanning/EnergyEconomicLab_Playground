import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableGenerationPRDComponent } from './controllable-generation-prd.component';
import {ControllableGenerator} from '../../core/data-types/ControllableGenerator';

describe('ControllableGenerationPRDComponent', () => {
  let component: ControllableGenerationPRDComponent;
  let fixture: ComponentFixture<ControllableGenerationPRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllableGenerationPRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllableGenerationPRDComponent);
    component = fixture.componentInstance;
    const CGC = new ControllableGenerator('testGen', 10, 2, 2, .3, .5);
    component.resource = CGC;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Controllable Generation Resource is displayed correctly', () => {
    xit('Heat Coupling Number is displayed', () => {

    });

    xit('Ramping Parameter is displayed', () => {

    });

    xit('Min. Uptime is displayed', () => {

    });

    xit('Min. Downtime is displayed', () => {

    });

    xit('Operation Status is displayed', () => {

    });

    xit('Max. Gen is displayed', () => {

    });

    xit(' Current Gen is displayed', () => {

    });
  });

  xdescribe('Toggle element / resource display hiding works', () => {

  });
});
