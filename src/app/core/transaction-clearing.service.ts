import { Injectable } from '@angular/core';
import {P2PBid} from './data-types/P2PBid';
import {ProsumerInstance} from './data-types/ProsumerInstance';
import {Subject} from 'rxjs';
import {TransactionFeeEntry} from './data-types/TransactionFeeEntry';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to provide the financial clearing for transactions.
 * Based on processes transactions, payment of tokens to actors is provided
 */
export class TransactionClearingService {

  private clearedBids: Set<P2PBid>;
  public newlyClearedBidEmitter: Subject<TransactionFeeEntry>;

  constructor() {
    this.clearedBids = new Set<P2PBid>();
    this.newlyClearedBidEmitter = new Subject<TransactionFeeEntry>();
  }

  /**
   * Method to clear a bid commitment with the respective actors.
   * Increases the tokens of the provider of the bid by the price minus the transaction fees, and decreases the tokens from the buyer by the price of the bid.
   * Add the cleared bid to the record of cleared bids.
   *
   * @param buyer The buyer of the electricity (the one committing to the bid)
   * @param timeOfPurchase The time of purchase of the electricity
   * @param committedBid The bid in question
   * @param transactionFeeAmount The amount of transaction fee to be retained
   */
  clearBidCommitment(buyer: ProsumerInstance, timeOfPurchase: number, committedBid: P2PBid, transactionFeeAmount: number): void {
    if (!this.clearedBids.has(committedBid)) {
      buyer.amountTokens -= committedBid.price;
      committedBid.provider.amountTokens += (committedBid.price * (1 - transactionFeeAmount));
      const transactionFee = {
        payer: committedBid.provider,
        amount: (committedBid.price * transactionFeeAmount),
        correspondingBid: committedBid
      };
      committedBid.provider.addIncurredFee(transactionFee);
      this.clearedBids.add(committedBid);
      this.newlyClearedBidEmitter.next(transactionFee);
    }
  }
}
