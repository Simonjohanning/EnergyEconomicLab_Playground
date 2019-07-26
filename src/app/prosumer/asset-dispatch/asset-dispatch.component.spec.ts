import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDispatchComponent } from './asset-dispatch.component';

describe('AssetDispatchComponent', () => {
  let component: AssetDispatchComponent;
  let fixture: ComponentFixture<AssetDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
