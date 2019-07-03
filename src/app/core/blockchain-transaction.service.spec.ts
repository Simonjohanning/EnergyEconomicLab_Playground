import { TestBed } from '@angular/core/testing';

import { BlockchainTransactionService } from './blockchain-transaction.service';

describe('BlockchainTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    expect(service).toBeTruthy();
  });

  it('open bids should initially be the same as mock bids', () => {
    const service: BlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    expect(service.getOpenBids().length).toBe(4);
  });

  it('committed bids should be empty', () => {
     const service: BlockchainTransactionService = TestBed.get(BlockchainTransactionService);
     expect(service.getCommitedBids.length > 0).toBeFalsy();
   });
});

