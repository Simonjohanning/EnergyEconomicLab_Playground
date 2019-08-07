import { Injectable } from '@angular/core';
import {DataProvisionService} from './data-provision.service';
import {ProsumerInstance} from './data-types/ProsumerInstance';

@Injectable({
  providedIn: 'root'
})

/**
 * This service holds and provides stateful information about an experiment (instance) to respective agents.
 *
 *
 */
export class ExperimentStateService {

  private currentProsumer: ProsumerInstance;
  public experimentID: number;
  public actorID: number;

  private prosumers: ProsumerInstance[];

  constructor() {
    DataProvisionService.getProsumerData(this.actorID).subscribe(prosumerInstance => {
      this.currentProsumer = prosumerInstance;
    });
  }

  getCurrentProsumer(): ProsumerInstance {
    return this.currentProsumer;
  }

  // TODO think about whether this makes even sense
  setCurrentProsumer(prosumerToSet: ProsumerInstance): boolean {
    if (!this.prosumers.includes(prosumerToSet)) { return false; } else {
      this.currentProsumer = prosumerToSet;
      return true;
    }
  }

}
