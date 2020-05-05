import { Injectable } from '@angular/core';
import { DataProvisionService } from './data-provision.service';
import { ProsumerInstance } from './data-types/ProsumerInstance';

@Injectable({
  providedIn: 'root'
})

// TODO Include/think about registering for experiments, signal readiness and handling experimental data
// TODO think if session data considering the respective prosumer should be stored here
/**
 * This service holds and provides stateful information about an experiment (instance) to respective agents.
 *
 */
export class ExperimentStateService {
  /** The prosumer instance participating in the experiment */
  private currentProsumer: ProsumerInstance;
  /** The id of experiment that is conducted */
  public experimentID: number;
  /** ID of the prosumer in order to derive the respective prosumer */
  public actorID: number;
  /** The prosumer (instances) participating in the experiment */
  private prosumers: ProsumerInstance[];

  constructor() {
    DataProvisionService.getProsumerData(this.actorID).subscribe(prosumerInstance => {
      this.currentProsumer = prosumerInstance;
    //  this.prosumers.push(this.currentProsumer);
    });
  }

  /**
   * returns currently active prosumer
   */
  getCurrentProsumer(): ProsumerInstance {
    return this.currentProsumer;
  }

  /**
   * Sets a prosumer as active prosumer
   *
   * @param prosumerToSet Prosumer that is activated
   */
  setCurrentProsumer(prosumerToSet: ProsumerInstance): boolean {
    if (this.prosumers === undefined) {
      this.prosumers = new Array(prosumerToSet);
      return true;
    }
    if (!this.prosumers.includes(prosumerToSet)) { return false; } else {
      this.currentProsumer = prosumerToSet;
      return true;
    }
  }

}
