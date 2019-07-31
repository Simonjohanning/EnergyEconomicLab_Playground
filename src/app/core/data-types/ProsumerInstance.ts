import {Coordinates} from './Coordinates';
import {ControllableGenerator} from './ControllableGenerator';
import {NonControllableGenerator} from './NonControllableGenerator';
import {Load} from './Load';
import {StorageUnit} from './StorageUnit';
import {Prosumer} from './Prosumer';

/**
 * A ProsumerInstance is a structure encapsulating Prosumer data from different source, i.e. the Prosumer identification interface, the respective assets, their coordinates and their tokens
 *
 * @param respectiveProsumer The identification structure of the Prosumer as the respective interface
 * @param controllableGenerators The array of the controllable generation assets the respective subject can operate within the simulation
 * @param nonControllableGenerators The array of the non-controllable generation assets the respective subject can operate within the simulation
 * @param loads The array of the load assets the respective subject can operate within the simulation
 * @param storage The array of the storage assets the respective subject can operate within the simulation
 * @param feedInCoordinates The (2-dimensional) coordinates of the Prosumer, placing them within the spatial model in the simulation
 * @param numTokens A variable to to keep track of the monetary resources of the test subject within the simulation
 */
export class ProsumerInstance {
  respectiveProsumer: Prosumer;
  controllableGenerators: ControllableGenerator[];
  nonControllableGenerators: NonControllableGenerator[];
  loads: Load[];
  storage: StorageUnit[];
  feedInCoordinates: Coordinates;
  numTokens: number;
  constructor(
    respectiveProsumer: Prosumer,
    controllableGenerators: ControllableGenerator[],
    nonControllableGenerators: NonControllableGenerator[],
    loads: Load[],
    storage: StorageUnit[],
    feedInCoordinates: Coordinates,
    numTokens: number
  ) {
    this.respectiveProsumer = respectiveProsumer;
    this.controllableGenerators = controllableGenerators;
    this.nonControllableGenerators = nonControllableGenerators;
    this.loads = loads;
    this.storage = storage;
    this.feedInCoordinates = feedInCoordinates;
    this.numTokens = numTokens;
  }
}
