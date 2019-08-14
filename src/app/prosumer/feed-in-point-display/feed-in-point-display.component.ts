import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {ConcreteCoordinates} from '../../core/data-types/ConcreteCoordinates';

@Component({
  selector: 'app-feed-in-point-display',
  templateUrl: './feed-in-point-display.component.html',
  styleUrls: ['./feed-in-point-display.component.css']
})

/**
 * A component to display information on the feed-in point of the respective prosumer
 */
export class FeedInPointDisplayComponent implements OnInit {
  /** The prosumer whose measuring point is to be described */
  @Input() prosumerObservable: Observable<ProsumerInstance>;
  /** The coordinates of the feed-in point to be displayed */
  public feedInPoint: ConcreteCoordinates;

  constructor() { }

  ngOnInit() {
    this.prosumerObservable.subscribe(loadedInstance => {
      this.feedInPoint = loadedInstance.feedInCoordinates;
    });
  }

}
