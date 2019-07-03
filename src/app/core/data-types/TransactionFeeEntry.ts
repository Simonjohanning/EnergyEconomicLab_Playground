import {Prosumer} from './Prosumer';
import {P2PBid} from './P2PBid';

export interface TransactionFeeEntry {
  payer: Prosumer;
  amount: number;
  correspondingBid: P2PBid;
}
