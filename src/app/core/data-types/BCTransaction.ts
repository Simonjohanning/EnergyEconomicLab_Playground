import {Prosumer} from './Prosumer';
import {P2PBid} from './P2PBid';

export interface BCTransaction {
  author: Prosumer;
  p2pbid?: P2PBid;
  timestamp: number;
}
