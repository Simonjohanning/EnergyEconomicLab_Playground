import {Coordinates} from './Coordinates';
import {ControllableGenerator} from './ControllableGenerator';
import {NonControllableGenerator} from './NonControllableGenerator';
import {Load} from './Load';
import {StorageUnit} from './StorageUnit';

export class ProsumerInstance {
  // respectiveProsumer: Prosumer;
  controllableGenerators: ControllableGenerator[];
  nonControllableGenerators: NonControllableGenerator[];
  loads: Load[];
  storage: StorageUnit[];
  feedInCoordinates: Coordinates;
  numTokens: number;
  constructor(  controllableGenerators: ControllableGenerator[],
                nonControllableGenerators: NonControllableGenerator[],
                loads: Load[],
                storage: StorageUnit[],
                feedInCoordinates: Coordinates,
                numTokens: number) {
    this.controllableGenerators = controllableGenerators;
    this.nonControllableGenerators = nonControllableGenerators;
    this.loads = loads;
    this.storage = storage;
    this.feedInCoordinates = feedInCoordinates;
    this.numTokens = numTokens;
  }
}
