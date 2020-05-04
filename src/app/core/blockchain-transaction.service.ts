import { Injectable } from '@angular/core';
import { P2PBid } from './data-types/P2PBid';
import { BCTransaction } from './data-types/BCTransaction';
import { Subject } from 'rxjs';
import { TimeService } from './time.service';
import { P2PMarketDesign } from './data-types/P2PMarketDesign';
import { MockEDMService } from './mock-edm.service';
import { DataProvisionService } from './data-provision.service';
import { ExperimentStateService } from './experiment-state.service';
import { BidValidationService } from './bid-validation.service';
import { TransactionClearingService } from './transaction-clearing.service';
import { ProsumerInstance } from './data-types/ProsumerInstance';

@Injectable({
  providedIn: 'root'
})

/**
 * The service facilitate the transactions for the blockchain.
 * Represents the binding element of the Angular/UI world and the blockchain it uses.
 * Encapsulates all functionality related with the blockchain layer within the LabChain project
 */
export class BlockchainTransactionService {
  /** Variable to keep track of the ID for the next free bid to avoid ID collisions */
  private freeBidId = 5;
  /** Variable to keep track of the ID for the next free ask to avoid ID collisions */
  private freeAskId = 3;
  /** Variable to track the bids that an other actor committed to */
  private committedBids: P2PBid[] = [];
  /** Variable to track the asks that an other actor committed to */
  private committedAsks: P2PBid[] = [];
  /** Variable to track the bids no actor committed to yet */
  private openBids: P2PBid[];
  /** Variable to track the asks no actor committed to yet */
  private openAsks: P2PBid[];
  /** Subject to emit the committed bids once their state changes in order to update the observers */
  public committedBidSubject: Subject<P2PBid> = new Subject<P2PBid>();
  /** Subject to emit the committed asks once their state changes in order to update the observers */
  public committedAskSubject: Subject<P2PBid> = new Subject<P2PBid>();
  /** Subject to emit the open bids once their state changes in order to update the observers */
  public openBidSubject: Subject<P2PBid[]> = new Subject<P2PBid[]>();
  /** Subject to emit the open asks once their state changes in order to update the observers */
  public openAskSubject: Subject<P2PBid[]> = new Subject<P2PBid[]>();
  /** Array to keep track of all transactions sent to the blockchain layer as the respective data type */
  private transactions: BCTransaction[] = [];
  /** Reference to the respective market design of the context the service is used in */
  private p2pMarketDesign: P2PMarketDesign;

  constructor(private timeService: TimeService,
              private edmService: MockEDMService,
              private state: ExperimentStateService,
              private data: DataProvisionService,
              private bvs: BidValidationService,
              private tcs: TransactionClearingService) {
    // TODO remove mock bids from this
    this.openBids = this.data.getMockBids();
    this.openAsks = this.data.getMockAsks();
    // subscribe to the time service and filter out the expired bid after every update
    this.timeService.timeEmitter.subscribe(currentTime => {
      // Filter out expired bids
      this.openBids = this.openBids.filter(currentBid => ((this.timeService.getCurrentTime() + this.p2pMarketDesign.bidClosure) > currentBid.deliveryTime));
      // Filter out expired asks
      this.openAsks = this.openAsks.filter(currentAsk => ((this.timeService.getCurrentTime() + this.p2pMarketDesign.askClosure) > currentAsk.deliveryTime));
      // After updating the open bids, inform the observers about the remaining open bids
      this.openBidSubject.next(this.openBids);
      // After updating the open asks, inform all observers about remaining open asks
      this.openAskSubject.next(this.openAsks);
    });
    // Set the P2PMarketDesign as soon as it is available
    DataProvisionService.getP2PMarketDescription(state.experimentID).subscribe(p2pMarketDesign => this.p2pMarketDesign = p2pMarketDesign);
  }

  /**
   * Method to commit to (accept) an open bid by an interested actor.
   * Adds the respective transaction to the blockchain, and does the respective housekeeping updating the open and committed bids stored in this service as well as informing the respective observers
   *
   * @param buyer The prosumer that committed to the bid
   * @param timeOfPurchase The point in the simulation that the prosumer purchased the electricity / committed to the bid
   * @param committedBid The bid the buyer is committing to
   * @returns true if this was successful, false if anything out of the ordinary happened, and the bid could not be committed to
   */
  public commitToP2PBid(buyer: ProsumerInstance, timeOfPurchase: number, committedBid: P2PBid): boolean {
    this.transactions.push({author: buyer, p2pbid: committedBid, timestamp: timeOfPurchase});
    this.committedBids.push(committedBid);
    this.committedBidSubject.next(committedBid);
    console.log(this.openBids.length);
    this.openBids = (this.openBids.slice(0, this.openBids.indexOf(committedBid)).concat(this.openBids.slice(this.openBids.indexOf(committedBid) + 1, this.openBids.length)));
    console.log(this.openBids.length);
    this.openBidSubject.next(this.openBids);
    console.log(this.transactions);
    console.log(this.committedBids);
    // TODO Think about whether this should be timed somewhere else
    this.tcs.clearBidCommitment(buyer, timeOfPurchase, committedBid, this.p2pMarketDesign.feeAmount);
    // TODO think about what could go wrong
    return true;
  }

// TODO docu
  public commitToP2PAsk(seller: ProsumerInstance, timeOfPurchase: number, committedAsk: P2PBid): boolean {
    this.transactions.push({author: seller, p2pbid: committedAsk, timestamp: timeOfPurchase});
    this.committedAsks.push(committedAsk);
    this.committedAskSubject.next(committedAsk);
    console.log(this.openAsks.length);
    this.openAsks = (this.openAsks.slice(0, this.openAsks.indexOf(committedAsk)).concat(this.openAsks.slice(this.openAsks.indexOf(committedAsk) + 1, this.openAsks.length)));
    console.log(this.openAsks.length);
    this.openAskSubject.next(this.openAsks);
    console.log(this.transactions);
    console.log(this.committedAsks);
    // TODO Think about whether this should be timed somewhere else
    this.tcs.clearAskCommitment(seller, timeOfPurchase, committedAsk, this.p2pMarketDesign.feeAmount);
    // TODO think about what could go wrong
    return true;
  }

  public getCommitedBids(): P2PBid[] { return this.committedBids; }
  public getCommitedAsks(): P2PBid[] { return this.committedAsks; }
  public getOpenBids(): P2PBid[] { return this.openBids; }
  public getOpenAsks(): P2PBid[] { return this.openAsks; }

  /**
   * Returns the latest unused free bid and increases it for the next bid (in linear fashion) beting able to be used
   *
   * @returns a probably unused bidID, as long as bid IDs are assigned linearly; will not check whether the returned ID is already used by another bid
   */
  getUnusedBidId(): number {
    return ++this.freeBidId;
  }

  getUnusedAskID(): number {
    return ++this.freeAskId;
  }

  // TODO getUnusedAsksID?


  // TODO think about whether this should check whether the prosumer could in theory provide the energy (e.g. via the residual load information) or whether extensive trading is allowed (and what happens upon non-delivery)
  /**
   * Method to submit a bid to the blockchain layer as an open bid.
   * Requires the bid to not have been committed before (i.e. not be in the list of open or committed bids) and to be valid.
   * Will otherwise not be successful.
   *
   * @param bid The bid to be committed to the blockchain
   * @returns Returns true if the bid has not been committed before and to be valid
   */
  submitBid(bid: P2PBid): boolean {
    if (((this.openBids.indexOf(bid) === - 1) && (this.committedBids.indexOf(bid) === - 1)) && this.bvs.checkBidValidity(bid)) {
      this.openBids.push(bid);
      this.openBidSubject.next(this.openBids);
      return true;
    } else {
      return false;
    }
  }

  // TODO documentation
  submitAsk(ask: P2PBid): boolean {
    if (((this.openAsks.indexOf(ask) === -1) && (this.committedAsks.indexOf(ask) === -1)) && this.bvs.checkBidValidity(ask)) {
      this.openAsks.push(ask);
      this.openAskSubject.next(this.openAsks);
      return true;
    } else {
      return false;
    }
  }
}
