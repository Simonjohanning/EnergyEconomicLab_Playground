import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPRDComponent } from './load-prd.component';

describe('LoadPRDComponent', () => {
  let component: LoadPRDComponent;
  let fixture: ComponentFixture<LoadPRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
