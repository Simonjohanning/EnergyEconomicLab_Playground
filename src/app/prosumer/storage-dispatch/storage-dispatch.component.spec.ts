import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageDispatchComponent } from './storage-dispatch.component';

describe('StorageDispatchComponent', () => {
  let component: StorageDispatchComponent;
  let fixture: ComponentFixture<StorageDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
