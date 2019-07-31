import {Prosumer} from './Prosumer';
import {P2PBid} from './P2PBid';

/**
 * Data type to represent a transaction to the blockchain
 *
 * @param author The prosumer that created the transaction
 * @param p2pbid The bid on the P2P market the transaction adds to the blockchain
 * @param timestamp The (current) time the transaction should be timestamped on the respective notes with
 */
export interface BCTransaction {
  author: Prosumer;
  p2pbid?: P2PBid;
  timestamp: number;
}
