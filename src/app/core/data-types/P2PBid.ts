import {Prosumer} from './Prosumer';

export interface P2PBid {
  id: number;
  provider: Prosumer;
  deliveryTime: number;
  duration: number;
  price: number;
  power: number;
}
