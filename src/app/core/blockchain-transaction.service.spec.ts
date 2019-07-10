import { TestBed } from '@angular/core/testing';

import { BlockchainTransactionService } from './blockchain-transaction.service';

describe('BlockchainTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const service: BlockchainTransactionService = TestBed.get(BlockchainTransactionService);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open bids should initially be the same as mock bids', () => {
    expect(service.getOpenBids().length).toBe(4);
  });

  xdescribe('Bid creation tests', () => {
    xit('created bids should be empty and existing at beginning of the simulation', () => {
    });

    xit('created bids should register as transactions', () => {
    });

    xit('created bids should be registered', () => {
    });

    xit('created bids should appear in the open bids', () => {
    });
  });

  xdescribe('Bid commitment tests', () => {
    it('committed bids should be empty at initialization', () => {
      expect(service.getCommitedBids.length > 0).toBeFalsy();
    });

    xit('bid commitment should be registered as a transaction', () => {
    });

    xit('commited bids should appear in the list of committed bids', () => {
    });

    xit('committed bids should disappear from the list of open bids', () => {
    });

  });

  xdescribe('Bid expiration tests', () => {
    xit('An open bid should expire throug the progress of time', () => {
    });
  });
});

