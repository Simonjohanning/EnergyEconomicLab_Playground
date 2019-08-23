import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from 'protractor';
import {DebugElement} from '@angular/core';
import {AppComponent} from '../../app.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ WelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Shorthand login works', () => {
    xit('Shorthand Prosumer login works', () => {
    });

    xit('Shorthand GridOperator login works', () => {
    });

    xit('Shorthand PublicActor login works', () => {
    });

    xit('Shorthand Experiment Designer login works', () => {
    });

  });

  xdescribe('Login works', () => {
    const button = document.createElement('button');
    beforeEach(() => {
      spyOn(component, 'login');
      button.setAttribute('id', 'logInButton');
      fixture.detectChanges();
    });

    xit('Text Field data binding works', () => {
    });

    xit('Valid Prosumer login works', () => {
    });

    xit('Invalid Prosumer login doesnt work (respective error msg)', () => {
    });

    xit('Valid Prosumer login works', () => {
    });

    xit('Invalid Prosumer login doesnt work (respective error msg)', () => {
    });

    xit('Valid Prosumer login works', () => {
    });

    xit('Invalid Prosumer login doesnt work (respective error msg)', () => {
    });

    xit('Valid Prosumer login works', () => {
    });

    xit('Invalid Prosumer login doesnt work (respective error msg)', () => {
    });

    xit('Unclear login text doesnt work (respective error msg)', () => {
    });
  });
});
