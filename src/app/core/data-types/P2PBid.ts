import {Prosumer} from './Prosumer';

/**
 * A P2PBid represents an item in an order book / double auction electricity market.
 * It represents the offer for a commitment on feeding electricity in the grid (sell offer) for a given time interval
 *
 * @param id The identificator number of the respective bid
 * @param provider The Prosumer that provides the electricity offer to the market
 * @param deliveryTime The time slice where the provider starts to feed in electricity (i.e. the trading partner buys the right for feedin it out)
 * @param duration The offered duration of the feedin commitment (allowing to determine the energy amount traded (in conjunction with power))
 * @param price The price the feedin commitment / trade is offered at in Currency/kWh
 * @param power The offered power of the feedin commitment (allowing to determine the energy amount traded (in conjunction with duration))
 */
export interface P2PBid {
  /** The identificator number of the respective bid */
  id: number;
  /** The Prosumer that provides the electricity offer to the market */
  provider: Prosumer;
  /** The time slice where the provider starts to feed in electricity (i.e. the trading partner buys the right for feedin it out) */
  deliveryTime: number;
  /** The offered duration of the feedin commitment (allowing to determine the energy amount traded (in conjunction with power)) */
  duration: number;
  /** The price the feedin commitment / trade is offered at in Currency/kWh */
  price: number;
  /** The offered power of the feedin commitment (allowing to determine the energy amount traded (in conjunction with duration)) */
  power: number;
}
