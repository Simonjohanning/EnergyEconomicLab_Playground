import { Injectable } from '@angular/core';
import {P2PBid} from './data-types/P2PBid';
import {Prosumer} from './data-types/Prosumer';
import {BCTransaction} from './data-types/BCTransaction';

@Injectable({
  providedIn: 'root'
})
export class BlockchainTransactionService {
  private mockBids: P2PBid[] = [
    {
      id: 1,
      provider: {id: 1},
      deliveryTime: 1,
      duration: 3,
      price: 2,
      power: 1.5
    },
    {
      id: 2,
      provider: {id: 1},
      deliveryTime: 2,
      duration: 2,
      price: 1.6,
      power: 1.5
    },
    {
      id: 3,
      provider: {id: 1},
      deliveryTime: 3,
      duration: 1,
      price: 2.2,
      power: 1.5
    },
    {
      id: 4,
      provider: {id: 1},
      deliveryTime: 3,
      duration: 2,
      price: 2.1,
      power: 1.5
    }
  ];
  private committedBids: P2PBid[];
  private transactions: BCTransaction[];

  constructor() { this.committedBids = []; this.transactions = []; }
  public getBids(startTime: number, endTime: number): P2PBid[] {
    const filteredList = this.mockBids.filter(bid => (bid.deliveryTime >= startTime) && (bid.duration <= (startTime + endTime)));
    return filteredList.filter(element => !this.committedBids.includes(element));
  }
  public commitToP2PBid(buyer: Prosumer, timeOfPurchase: number, committedBid: P2PBid) {
    this.transactions.push({author: buyer, p2pbid: committedBid, timestamp: timeOfPurchase});
    this.committedBids.push(committedBid);
    console.log(this.transactions);
    console.log(this.committedBids);
  }
  public getCommittedBids(prosumer: Prosumer): P2PBid[] {
    const respectiveTransactions: BCTransaction[] = this.transactions.filter(bid => bid.author === prosumer);
    const respectiveBids = respectiveTransactions.map(transaction => transaction.p2pbid);
    return respectiveBids;
  }
}
