import {DER} from './DER';

export class ControllableGenerator extends DER {
  model: string;
  currentGeneration: number;
  maximalGeneration: number;
  operationStatus: boolean;
  minimalDowntime: number;
  minimalUptime: number;
  rampingParameter: number;
  heatCouplingNumber: number;
}
