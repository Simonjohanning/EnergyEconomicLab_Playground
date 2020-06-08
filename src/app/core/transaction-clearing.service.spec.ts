import { TestBed } from '@angular/core/testing';

import { TransactionClearingService } from './transaction-clearing.service';
import { P2POption } from './data-types/P2POption';
import { Prosumer } from './data-types/Prosumer';
import { ProsumerInstance } from './data-types/ProsumerInstance';
import {ConcreteCoordinates} from './data-types/ConcreteCoordinates';

describe('TransactionClearingService', () => {
  let service: TransactionClearingService;

  const dummyProsumer: ProsumerInstance =
    new ProsumerInstance(
      new Prosumer(10, 'mock prosumer'),
      [],
      [],
      [],
      [],
      new ConcreteCoordinates(2, 4),
      100);

  const bid: P2POption = {
    id: 1,
    optionCreator: dummyProsumer,
    deliveryTime: 81,
    duration: 3,
    price: 2,
    power: 1.5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TransactionClearingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('bids: ', () => {
    it('bid should only be cleared if it has not been cleared before', () => {
      service.clearBidCommitment(dummyProsumer, 10, bid, 1.0);
      expect(() => {
        service.clearBidCommitment(dummyProsumer, 10, bid, 1.0);
      }).toThrowError('bid with id 1 has already been cleared before');
    });
  });

  describe('asks: ', () => {
    it('ask should only be cleared  if it has not been cleared before', () => {
      service.clearAskCommitment(dummyProsumer, 10, bid, 1.0);
      expect(() => {
        service.clearAskCommitment(dummyProsumer, 10, bid, 1.0);
      }).toThrowError('ask with id 1 has already been cleared before');
    });
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
