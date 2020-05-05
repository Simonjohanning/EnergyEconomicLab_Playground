import { Injectable } from '@angular/core';
import { P2PBid } from './data-types/P2PBid';
import { ProsumerInstance } from './data-types/ProsumerInstance';
import { ReplaySubject } from 'rxjs';
import { TransactionFeeEntry } from './data-types/TransactionFeeEntry';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to provide the financial clearing for transactions.
 * Based on processes transactions, payment of tokens to actors is provided
 */
export class TransactionClearingService {

  /** The set of bids already cleared formerly by the service */
  private clearedBids: Set<P2PBid>;
  /** The set of asks already cleared formerly by the service */
  private clearedAsks: Set<P2PBid>;
  /** An emitter that informs its observers on fee entries of newly cleared transactions */
  public newlyClearedBidEmitter: ReplaySubject<TransactionFeeEntry>;

  constructor() {
    this.clearedBids = new Set<P2PBid>();
    this.clearedAsks = new Set<P2PBid>();
    this.newlyClearedBidEmitter = new ReplaySubject<TransactionFeeEntry>();
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
    console.log('TCS being called');
    if (!this.clearedBids.has(committedBid)) {
      buyer.amountTokens -= committedBid.price;
      committedBid.provider.amountTokens += (committedBid.price * (1 - transactionFeeAmount));
      const transactionFee = {
        payer: committedBid.provider,
        amount: (committedBid.price * transactionFeeAmount),
        correspondingTransaction: committedBid
      };
      committedBid.provider.addIncurredFee(transactionFee);
      console.log('adding ' + committedBid + ' to cleared bid');
      this.clearedBids.add(committedBid);
      console.log('emitting transFee');
      this.newlyClearedBidEmitter.next(transactionFee);
    }
  }

  /**
   * Method to clear a ask commitment with the respective actors.
   * Increases the tokens of the provider of the bid by the price minus the TODO transaction fees, and decreases the tokens from the buyer by the price of the ask.
   * Add the cleared ask to the record of cleared asks.
   *
   * @param seller The seller of the electricity (the one committing to the ask)
   * @param timeOfPurchase The time of purchase of the electricity
   * @param committedAsk The ask in question
   * @param transactionFeeAmount The amount of transaction fee to be retained
   */
  clearAskCommitment(seller: ProsumerInstance, timeOfPurchase: number, committedAsk: P2PBid, transactionFeeAmount: number): void {
    console.log('TCS being called');
    if (!this.clearedAsks.has(committedAsk)) {
      seller.amountTokens += committedAsk.price;
      committedAsk.provider.amountTokens -= (committedAsk.price * (1 + transactionFeeAmount));
      // TODO who pays the fee???
      const transactionFee = {
        payer: committedAsk.provider,
        amount: (committedAsk.price * transactionFeeAmount),
        correspondingTransaction: committedAsk
      };
      committedAsk.provider.addIncurredFee(transactionFee);
      console.log('adding ' + committedAsk + ' to cleared bid');
      this.clearedBids.add(committedAsk);
      console.log('emitting transFee');
      this.newlyClearedBidEmitter.next(transactionFee);
    }
  }
}
