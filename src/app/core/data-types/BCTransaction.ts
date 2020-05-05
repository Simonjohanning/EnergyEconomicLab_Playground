import {P2POption} from './P2POption';
import {ProsumerInstance} from './ProsumerInstance';

/**
 * Data type to represent a transaction to the blockchain
 *
 * @param author The prosumer that created the transaction
 * @param p2pbid The bid on the P2P market the transaction adds to the blockchain
 * @param timestamp The (current) time the transaction should be timestamped on the respective nodes with
 */
export interface BCTransaction {
  /** The prosumer instance that created the transaction */
  author: ProsumerInstance;
  /** The bid on the P2P market the transaction adds to the blockchain */
  p2pbid?: P2POption;
  /** The time the transaction should be timestamped on the respective nodes with */
  timestamp: number;
}
