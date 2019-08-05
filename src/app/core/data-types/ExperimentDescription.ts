import {Prosumer} from './Prosumer';
import {P2PMarketDesign} from './P2PMarketDesign';

/**
 * A data type that describes an experiments configuration as a blue print to run concrete instances in
 *
 * @param prosumer The prosumers participating in the experiment
 * @param p2pMarketDesign The market design of the experiment
 * @param description A textual description of the experiment
 */
export interface ExperimentDescription {
  /** The prosumers participating in the experiment */
  prosumers: Prosumer[];
  /** The market design of the experiment */
  p2pMarketDesign: P2PMarketDesign;
  /** A textual description of the experiment */
  description: string;
}
