import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistentResourceDisplayComponent } from './persistent-resource-display.component';

describe('PersistentResourceDisplayComponent', () => {
  let component: PersistentResourceDisplayComponent;
  let fixture: ComponentFixture<PersistentResourceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersistentResourceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistentResourceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
