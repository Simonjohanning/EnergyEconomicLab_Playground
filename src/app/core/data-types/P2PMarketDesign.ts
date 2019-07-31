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
  bidClosure: number;
  timeSliceLength: number;
  minBidSize: number;
  maxPrice: number;
  feeAmount: number;
}
