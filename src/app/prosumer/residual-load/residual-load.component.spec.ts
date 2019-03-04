import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidualLoadComponent } from './residual-load.component';

describe('ResidualLoadComponent', () => {
  let component: ResidualLoadComponent;
  let fixture: ComponentFixture<ResidualLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidualLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidualLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
