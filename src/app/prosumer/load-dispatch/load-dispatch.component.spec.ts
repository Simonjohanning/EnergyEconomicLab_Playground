import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDispatchComponent } from './load-dispatch.component';

describe('LoadDispatchComponent', () => {
  let component: LoadDispatchComponent;
  let fixture: ComponentFixture<LoadDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
