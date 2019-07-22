import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicActorComponent } from './public-actor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ExperimentInstanceLoaderService} from '../core/experiment-instance-loader.service';

describe('PublicActorComponent', () => {
  let component: PublicActorComponent;
  let fixture: ComponentFixture<PublicActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PublicActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Experiment information is displayed correctly', () => {
    xit('Experiment id is displayed correctly', () => {

    });

    xit('nothing is displayed while waiting on experiment', () => {

    });
  });

  xdescribe('Transactions are displayed correctly', () => {
    xit('Placeholder is shown with no transactions', () => {

    });
    xdescribe('Individual transactions are displayed correctly', () => {
      xit('Payer id is shown correctly', () => {

      });

      xit('Amount is shown correctly', () => {

      });

      xit('ID of corresponding bid is shown correctly', () => {

      });
    });
  })
});
