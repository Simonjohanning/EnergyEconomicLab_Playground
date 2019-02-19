import {DER} from './DER';

export class Load extends DER {
  model: string;
  loadProfile: number[];
  relativeControllability: number;
  temporalShiftingCapability: number;
}
