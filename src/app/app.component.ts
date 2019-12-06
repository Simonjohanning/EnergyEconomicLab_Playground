import { Component } from '@angular/core';
import { TimeService } from './core/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Super component for the application.
 * Contains the shared data not encapsulated in services for the contained components and hosts the common service that is injected in child components
 */
export class AppComponent {
  title = 'labPlayground';
  constructor(private timeService: TimeService) {}

  /**
   * Method to advance time for testing purposes
   */
  private proceedTime() {
    this.timeService.advanceTime(1);
  }
}
