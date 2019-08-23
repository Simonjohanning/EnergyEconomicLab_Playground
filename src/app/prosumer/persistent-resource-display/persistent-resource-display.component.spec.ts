import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistentResourceDisplayComponent } from './persistent-resource-display.component';
import {Prosumer} from '../../core/data-types/Prosumer';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {Load} from '../../core/data-types/Load';
import {of} from 'rxjs';
import {FeedInPointDisplayComponent} from '../feed-in-point-display/feed-in-point-display.component';
import {ResidualLoadComponent} from '../residual-load/residual-load.component';
import {ResourceLoader} from '@angular/compiler';
import {ControllableGenerationPRDComponent} from '../controllable-generation-prd/controllable-generation-prd.component';
import {NonControllableGenerationPRDComponent} from '../non-controllable-generation-prd/non-controllable-generation-prd.component';
import {LoadPRDComponent} from '../load-prd/load-prd.component';
import {StoragePRDComponent} from '../storage-prd/storage-prd.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PersistentResourceDisplayComponent', () => {
  let component: PersistentResourceDisplayComponent;
  let fixture: ComponentFixture<PersistentResourceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PersistentResourceDisplayComponent, FeedInPointDisplayComponent, ResidualLoadComponent, ControllableGenerationPRDComponent, NonControllableGenerationPRDComponent, LoadPRDComponent, StoragePRDComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistentResourceDisplayComponent);
    component = fixture.componentInstance;
    // const load = new Load('testmodel', [.3, .4, .5, .7], .4, .2);
    // const prosInst = new ProsumerInstance([],[],[load],[], {x: 3, y: 4}, 100);
    // component.prosumerInstance = of(prosInst);
    // el = fixture.debugElement.query(By.css('div'));
    // tslint:disable-next-line:no-debugger
    debugger;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Tokens shown when prosumer loaded', () => {
  //   // expect(el.nativeElement.textContent.trim()).toBe('  Loading stuff...');
  //   fixture.detectChanges();
  //   expect(el.nativeElement.textContent.trim()).toBe('tokens: 100');
  // });

});
