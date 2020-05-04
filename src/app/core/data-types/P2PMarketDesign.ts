/**
 * Data structure to specify the design for the P2P market within an experiment.
 *
 * @param bidClosure The amount of time before the delivery point that trading is closed / no more bids can be introduced into the market or can be edited
 * @param timeSliceLength The length of the trading intervals (delivery time length quantities) of which duration will be a multiple
 * @param minBidSize The minimal size of each bid in the market (under which the bid will be rejected)
 * @param maxPrice The maximal price of an electricity bid, if there is a price cap in the market (-1 signifying that there is no price cap)
 * @param feeAmount The fees each trade incurs by the market operator and public actor, as a fraction of the trading price
 */
export interface P2PMarketDesign {
  /** The amount of time before the delivery point that trading is closed / no more bids can be introduced into the market or can be edited */
  bidClosure: number;
  /** The amount of time before the delivery point that trading is closed / no more asks can be introduced into the market or can be edited */
  askClosure: number;
  /** The length of the trading intervals (delivery time length quantities) of which duration will be a multiple */
  timeSliceLength: number;
  /** The minimal size of each bid in the market (under which the bid will be rejected) */
  minBidSize: number;
  /** The minimal size of each ask in the market (under which the bid will be rejected) */
  minAskSize: number;
  /** The maximal price of an electricity bid, if there is a price cap in the market (-1 signifying that there is no price cap) */
  maxPrice: number;
  /** The fees each trade incurs by the market operator and public actor, as a fraction of the trading price */
  feeAmount: number;
}
