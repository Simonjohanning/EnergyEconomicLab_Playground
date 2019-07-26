import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CGDispatchComponent } from './cgdispatch.component';

describe('CGDispatchComponent', () => {
  let component: CGDispatchComponent;
  let fixture: ComponentFixture<CGDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CGDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CGDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
