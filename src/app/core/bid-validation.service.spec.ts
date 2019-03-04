import { TestBed } from '@angular/core/testing';

import { BidValidationService } from './bid-validation.service';

describe('BidValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidValidationService = TestBed.get(BidValidationService);
    expect(service).toBeTruthy();
  });
});
