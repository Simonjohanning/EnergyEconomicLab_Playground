import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePRDComponent } from './storage-prd.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
