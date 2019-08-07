import {Coordinates} from './Coordinates';
import {ControllableGenerator} from './ControllableGenerator';
import {NonControllableGenerator} from './NonControllableGenerator';
import {Load} from './Load';
import {StorageUnit} from './StorageUnit';
import {Prosumer} from './Prosumer';
import {TransactionFeeEntry} from './TransactionFeeEntry';

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
  amountTokens: number;
  private paidFees: TransactionFeeEntry[];
  constructor(
    readonly respectiveProsumer: Prosumer,
    readonly controllableGenerators: ControllableGenerator[],
    readonly nonControllableGenerators: NonControllableGenerator[],
    readonly loads: Load[],
    readonly storage: StorageUnit[],
    readonly feedInCoordinates: Coordinates,
    numTokens: number
  ) {
    this.amountTokens = numTokens;
    this.paidFees = new Array<TransactionFeeEntry>();
  }

  addIncurredFee(currentFee: TransactionFeeEntry) {
    this.paidFees.push(currentFee);
  }
}
