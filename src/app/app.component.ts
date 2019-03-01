import { Component } from '@angular/core';
import {TimeService} from './core/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab Playground';
  constructor(private timeService: TimeService) {}
  private proceedTime() {
    this.timeService.advanceTime(1);
  }
}
