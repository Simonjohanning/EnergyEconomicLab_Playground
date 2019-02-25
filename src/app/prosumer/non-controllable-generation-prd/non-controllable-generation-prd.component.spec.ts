import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonControllableGenerationPRDComponent } from './non-controllable-generation-prd.component';

describe('NonControllableGenerationPRDComponent', () => {
  let component: NonControllableGenerationPRDComponent;
  let fixture: ComponentFixture<NonControllableGenerationPRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonControllableGenerationPRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonControllableGenerationPRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
