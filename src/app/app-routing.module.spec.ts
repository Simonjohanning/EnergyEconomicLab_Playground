import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('Router: App', () => {

  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppRoutingModule
      ]
    });

    router = TestBed.get(Router);
    router.initialNavigation();

  });

  it('router exists', () => {
    expect(router).toBeTruthy();
  });
});
