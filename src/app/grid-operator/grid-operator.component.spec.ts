import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOperatorComponent } from './grid-operator.component';

describe('GridOperatorComponent', () => {
  let component: GridOperatorComponent;
  let fixture: ComponentFixture<GridOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Grid operator display elements are displayed', () => {

  });
});
