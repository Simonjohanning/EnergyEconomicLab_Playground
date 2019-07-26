import {TimeService} from '../time.service';
import {MockEDMService} from '../mock-edm.service';

export class DispatchableAsset {

  public scheduledGeneration: number[];

  // TODO think about whether to encapsulate timeService in here (better checking, but shouldn't be part of the asset (?))
  constructor(
    readonly model: string){
  }

  public scheduleGeneration(timeService: TimeService, timeStep: number, amount: number): boolean {
    if (this.scheduledGeneration === undefined){
      this.scheduledGeneration = new Array<number>(timeService.getEndTime());
    }
    if (timeService.getCurrentTime() >= timeStep) {
      return false;
    } else {
      this.scheduledGeneration[timeStep] = amount;
      return true;
    }
  }

}
