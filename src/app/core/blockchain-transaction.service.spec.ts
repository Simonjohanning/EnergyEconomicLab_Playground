import { TestBed } from '@angular/core/testing';

import { BlockchainTransactionService } from './blockchain-transaction.service';

describe('BlockchainTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    expect(service).toBeTruthy();
  });
});
