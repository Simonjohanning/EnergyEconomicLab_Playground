import { TestBed } from '@angular/core/testing';

import { TransactionClearingService } from './transaction-clearing.service';

describe('TransactionClearingService', () => {
  let service: TransactionClearingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TransactionClearingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('bids:', () => {
    it ('bid only cleared if it has not been cleared before', () => {
      // todo add bid and then try clearing it again
      // todo mock P2P option
    });
  });
  /*
  clearBidCommitment(buyer: ProsumerInstance, timeOfPurchase: number, committedBid: P2POption, transactionFeeAmount: number): void {
    console.log('TCS being called');
    if (!this.clearedBids.has(committedBid)) {
      buyer.amountTokens -= committedBid.price;
      committedBid.optionCreator.amountTokens += (committedBid.price * (1 - transactionFeeAmount));
      const transactionFee = {
        payer: committedBid.optionCreator,
        amount: (committedBid.price * transactionFeeAmount),
        correspondingTransaction: committedBid
      };
      committedBid.optionCreator.addIncurredFee(transactionFee);
      console.log('adding ' + committedBid + ' to cleared bid');
      this.clearedBids.add(committedBid);
      console.log('emitting transFee');
      this.newlyClearedBidEmitter.next(transactionFee);
    }
  }
   */
  // TODO clear ask
});
