import { TestBed } from '@angular/core/testing';

import { MockEDMService } from './mock-edm.service';

describe('MockEDMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockEDMService = TestBed.get(MockEDMService);
    expect(service).toBeTruthy();
  });

  xdescribe('test of individual data provision services via mock interface', () => {

  });
});

