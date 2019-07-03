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
});
