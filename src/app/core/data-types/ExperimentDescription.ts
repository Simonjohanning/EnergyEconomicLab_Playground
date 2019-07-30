import {Prosumer} from './Prosumer';
import {P2PMarketDesign} from './P2PMarketDesign';

/**
 * @param prosumer The prosumers participating in the experiment
 * @param p2pMarketDesign The market design of the experiment
 * @param description A textual description of the experiment
 */
export interface ExperimentDescription {
  prosumers: Prosumer[];
  p2pMarketDesign: P2PMarketDesign;
  description: string;
}
