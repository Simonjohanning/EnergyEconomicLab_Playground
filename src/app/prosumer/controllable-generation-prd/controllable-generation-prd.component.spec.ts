import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableGenerationPRDComponent } from './controllable-generation-prd.component';

describe('ControllableGenerationPRDComponent', () => {
  let component: ControllableGenerationPRDComponent;
  let fixture: ComponentFixture<ControllableGenerationPRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllableGenerationPRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllableGenerationPRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
