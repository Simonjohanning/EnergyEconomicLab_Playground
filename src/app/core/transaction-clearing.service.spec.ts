import { TestBed } from '@angular/core/testing';

import { TransactionClearingService } from './transaction-clearing.service';

describe('TransactionClearingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionClearingService = TestBed.get(TransactionClearingService);
    expect(service).toBeTruthy();
  });
});
