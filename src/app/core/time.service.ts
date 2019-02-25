import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private currentTime: number;
  constructor() {
    this.currentTime = 0;
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }
  public advanceTime(amount: number): void {
    if (amount > 0) { this.currentTime += amount; }
  }
}
