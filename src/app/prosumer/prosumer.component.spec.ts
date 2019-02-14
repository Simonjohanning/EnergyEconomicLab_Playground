import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerComponent } from './prosumer.component';

describe('ProsumerComponent', () => {
  let component: ProsumerComponent;
  let fixture: ComponentFixture<ProsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
