import { Injectable } from '@angular/core';
import {Prosumer} from './data-types/Prosumer';

@Injectable({
  providedIn: 'root'
})
export class ExperimentStateService {

  public experimentTime: number;
  private currentProsumer: Prosumer;
  public experimentID: number;
  public actorID: number;

  private prosumers: Prosumer[] = [
    {id: 1, name: 'Hans'},
    {id: 2, name: 'Jutta'}
  ];
  constructor() {
    this.actorID = null;
  }

  getCurrentProsumer(): Prosumer {
    return this.currentProsumer;
  }
  setCurrentProsumer(prosumerToSet: Prosumer): boolean {
    if (!this.prosumers.includes(prosumerToSet)) { return false; } else {
      this.currentProsumer = prosumerToSet;
      return true;
    }
  }
  getProsumers(): Prosumer[] {
    return this.prosumers;
  }
  setDefaultProsumer() {
    this.currentProsumer = this.prosumers[0];
  }

  proceedTime(amount: number) {
    this.experimentTime += amount;
  }
}
