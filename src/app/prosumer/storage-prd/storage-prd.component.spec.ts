import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePRDComponent } from './storage-prd.component';
import {StorageUnit} from '../../core/data-types/StorageUnit';

describe('StoragePRDComponent', () => {
  let component: StoragePRDComponent;
  let fixture: ComponentFixture<StoragePRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragePRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragePRDComponent);
    component = fixture.componentInstance;
    const storUn = new StorageUnit('tester', 4.3, 1.1, 1.1, .97, .4);
    component.resource = storUn;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
